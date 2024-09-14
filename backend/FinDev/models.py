from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager


# Create your models here.

class UserManager(BaseUserManager):
    pass

class Resumes(models.Model):
    file_id = models.AutoField(primary_key=True)
    file = models.FileField(upload_to='documents/')
    uploaded_at = models.DateTimeField(auto_now_add=True)

class Users(AbstractBaseUser):
    id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=255, unique=True)
    email = models.CharField(max_length=255, unique=True)
    password = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)

    role = models.CharField(max_length=255)
    bio = models.TextField()

    resume = models.ForeignKey(Resumes, on_delete=models.CASCADE, blank=True, null=True)

    #profile_picture = models.ForeignKey(ProfilePicture, on_delete=models.CASCADE, null=True)#on_delete=models.SET_DEFAULT, default=1, blank=False, null=False)

    USERNAME_FIELD = 'username'
    # REQUIRED_FIELDS = []  
    objects = UserManager()
    
    def __str__(self):
        return self.username

class Posts(models.Model):
    post_id = models.AutoField(primary_key=True)
    user_id = models.ForeignKey(Users, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    description = models.TextField()
    role = models.TextField()