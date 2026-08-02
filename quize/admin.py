from django.contrib import admin
from .models import Cretegory, Quiz, Question, Option, QuizAttempt

# Register your models here.
admin.site.register(Cretegory)
admin.site.register(Quiz)
admin.site.register(Question)
admin.site.register(Option) 
admin.site.register(QuizAttempt)