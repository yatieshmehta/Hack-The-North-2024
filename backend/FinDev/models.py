from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager


# Create your models here.


class UserManager(BaseUserManager):
    pass


def resume_path(instance, filename):
    return f"documents/{instance.username}/{filename}"


class Users(AbstractBaseUser):
    id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=255, unique=True)
    email = models.CharField(max_length=255, unique=True)
    password = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)

    role = models.CharField(max_length=255)
    bio = models.TextField()
    resume = models.FileField(upload_to=resume_path)

    #profile_picture = models.ForeignKey(ProfilePicture, on_delete=models.CASCADE, null=True)#on_delete=models.SET_DEFAULT, default=1, blank=False, null=False)

    USERNAME_FIELD = 'username'
    # REQUIRED_FIELDS = []  
    objects = UserManager()
    
    def __str__(self):
        return self.username


def thumbnail_path(instance, filename):
    return f"documents/{instance.user_id.username}/posts/{instance.post_id}"


class Posts(models.Model):
    post_id = models.AutoField(primary_key=True)
    user_id = models.ForeignKey(Users, on_delete=models.CASCADE)
    thumbnail = models.ImageField(upload_to=thumbnail_path)
    title = models.CharField(max_length=255)
    description = models.TextField()
    role = models.TextField()
    reqs = models.TextField()
    applicants = models.ManyToManyField(Users, related_name='applied', blank=True, null=True)
    matched = models.ForeignKey(Users, related_name='matched', on_delete=models.SET_NULL, null=True, blank=True)