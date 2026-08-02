from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Cretegory(models.Model):
    name = models.CharField(max_length=100)
    def __str__(self):
        return self.name


class Quiz(models.Model):
    title = models.CharField(max_length=100)
    category = models.ForeignKey(
        Cretegory, 
        on_delete=models.CASCADE,
        related_name='quizzes')
    def __str__(self):
        return self.title

class Question(models.Model):
    quiz = models.ForeignKey(
        Quiz, 
        on_delete=models.CASCADE,
        related_name='questions')
    question = models.TextField()
    def __str__(self):
        return self.question

class Option(models.Model):
    question = models.ForeignKey(
        Question, 
        on_delete=models.CASCADE,
        related_name='options')
    option = models.CharField(max_length=100)
    is_correct = models.BooleanField(default=False)
    def __str__(self):
        return self.option

class QuizAttempt(models.Model):
    user = models.ForeignKey(
        User, 
        on_delete=models.CASCADE)
    quiz = models.ForeignKey(
        Quiz, 
        on_delete=models.CASCADE)
    score = models.IntegerField(default=0)
    attempted_at = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return f"{self.user.username} - {self.quiz.title} - {self.score}"