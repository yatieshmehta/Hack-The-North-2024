from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager


# Create your models here.


class UserManager(BaseUserManager):
    pass


def resume_path(instance, filename):
    return f"documents/{instance.email}/{filename}"


def pfp_path(instance, filename):
    return f"documents/{instance.email}/{filename}"


class Users(AbstractBaseUser):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    email = models.CharField(max_length=255, unique=True)
    password = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)

    devFocus = models.CharField(max_length=255)
    bio = models.TextField()
    favoriteLanguage = models.CharField(max_length=255)
    resume = models.FileField(upload_to=resume_path, blank=True, null=True)
    githubUsername = models.CharField(max_length=255, blank=True, null=True)
    linkedin = models.CharField(max_length=255, blank=True, null=True)

    profile_picture = models.ImageField(upload_to=pfp_path, blank=True, null=True)

    USERNAME_FIELD = 'email'
    # REQUIRED_FIELDS = []  
    objects = UserManager()
    
    def __str__(self):
        return self.username


def thumbnail_path(instance, filename):
    return f"documents/{instance.user_id.name}/posts/{instance.post_id}"


class Posts(models.Model):
    post_id = models.AutoField(primary_key=True)
    user_id = models.ForeignKey(Users, on_delete=models.CASCADE)
    thumbnail = models.ImageField(upload_to=thumbnail_path)
    title = models.CharField(max_length=255)
    description = models.TextField()
    devFocus = models.TextField()
    reqs = models.TextField()
    applicants = models.ManyToManyField(Users, related_name='applied', blank=True, null=True)
    matched = models.ForeignKey(Users, related_name='matched', on_delete=models.SET_NULL, null=True, blank=True)


class Chat(models.Model):
    chat_id = models.AutoField(primary_key=True)
    user1 = models.ForeignKey(Users, related_name='user1', on_delete=models.CASCADE)
    user2 = models.ForeignKey(Users, related_name='user2', on_delete=models.CASCADE)
    post = models.ForeignKey(Posts, on_delete=models.CASCADE)
    used = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ('user1', 'user2', 'post')
        ordering = ['-updated_at']


class Message(models.Model):
    message_id = models.AutoField(primary_key=True)
    chat = models.ForeignKey(Chat, related_name='messages', on_delete=models.CASCADE)
    sender = models.ForeignKey(Users, on_delete=models.CASCADE)
    content = models.TextField(blank=True, null=True)
    #attachment = models.FileField(upload_to='attachments/', blank=True, null=True)
    sent_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-sent_at']