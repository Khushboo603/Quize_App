from rest_framework.routers import DefaultRouter
from .views import CategoryViewSet, QuizViewSet, QuestionViewSet, OptionViewSet, QuizAttemptViewSet

router = DefaultRouter()
router.register(r'categories', CategoryViewSet)
router.register(r'quizzes', QuizViewSet)
router.register(r'questions', QuestionViewSet)
router.register(r'options', OptionViewSet)
router.register(r'attempts', QuizAttemptViewSet)

urlpatterns = router.urls