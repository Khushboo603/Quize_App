from django.shortcuts import render
from rest_framework import viewsets
from .models import Cretegory, Quiz, Question, Option, QuizAttempt
from .serializers import CretegorySerializer, QuizSerializer, QuestionSerializer, OptionSerializer, QuizAttemptSerializer

# Create your views here.
class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Cretegory.objects.all()
    serializer_class = CretegorySerializer

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

