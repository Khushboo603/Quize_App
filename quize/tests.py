from django.test import TestCase

from .models import Category, Quiz

# Create your tests here.

class CategoryModelTest(TestCase):
    def test_category_creation(self):
        category = Category.objects.create(name="Angular")

        self.assertEqual(category.name, "Angular")
        self.assertEqual(str(category), "Angular")

class QuizModelTest(TestCase):
    def test_quiz_creation(self):
        category = Category.objects.create(name="Angular")
        quiz = Quiz.objects.create(
            title="Angular Basic",
            Category=category
        )

        self.assertEqual(quiz.title, "Angular Basic")
        self.assertEqual(quiz.Category, category)
        self.assertEqual(str(quiz), "Angular Basic")
