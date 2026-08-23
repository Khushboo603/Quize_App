from django.shortcuts import render
from rest_framework import viewsets
from .models import Category, Quiz, Question, Option, QuizAttempt
from .serializers import CategorySerializer, QuizSerializer, QuestionSerializer, OptionSerializer, QuizAttemptSerializer
from rest_framework.permissions import AllowAny


from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from .serializers import SubmitQuizSerializer

# Create your views here.
class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all() # it returns model objects of Category class from models.py file, not a JSON.
    serializer_class = CategorySerializer # Whenever we want to convert model objects into JSON, we use serializer class. It converts model objects into JSON format.

    permission_classes = [AllowAny] # This allows any user to access this viewset without authentication. If we want to restrict access to authenticated users only, we can use IsAuthenticated permission class instead of AllowAny.

class QuizViewSet(viewsets.ModelViewSet):
    queryset = Quiz.objects.all()
    serializer_class = QuizSerializer

class QuestionViewSet(viewsets.ModelViewSet):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer

class OptionViewSet(viewsets.ModelViewSet):
    queryset = Option.objects.all()
    serializer_class = OptionSerializer

class QuizAttemptViewSet(viewsets.ModelViewSet):
    queryset = QuizAttempt.objects.all()
    serializer_class = QuizAttemptSerializer

class SubmitQuizView(APIView):
    # permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = SubmitQuizSerializer(data=request.data)
        print('serializer data:', serializer)

        if not serializer.is_valid():
            return Response(
                serializer.errors, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        quiz_id = serializer.validated_data['quiz']
        answers = serializer.validated_data['answers']

        try:
            quiz = Quiz.objects.get(id=quiz_id)
        except Quiz.DoesNotExist:
            return Response(
                {"error": "Quiz not found."}, 
                status=status.HTTP_404_NOT_FOUND
            )

        score = 0
        total_questions = quiz.questions.count()

        for answer in answers:

            question_id = answer.get('question')
            option_id = answer.get('option')

            try:
                option = Option.objects.get(
                    id=option_id, 
                    question_id=question_id
                )
            except Option.DoesNotExist:
                continue  # Skip if the option does not exist

            if option.is_correct:
                score += 1

        attempt = QuizAttempt.objects.create(
            user=request.user,
            quiz=quiz,
            score=score
        )

        return Response(
            {
                "message": "Quiz submitted successfully.",
                "title": quiz.title,
                "score": score,
                "total_questions": total_questions,
                "attempt_id": attempt.id
            },
            status=status.HTTP_201_CREATED
        )

        