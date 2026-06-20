from django.db import models

class SiteSettings(models.Model):
    site_name = models.CharField(max_length=100, default='Portfolio')
    bio = models.TextField()
    email = models.EmailField()

    def __str__(self):
        return self.site_name

class SocialLinks(models.Model):
    platform = models.CharField(max_length=100)
    url = models.URLField()
    icon_name = models.CharField(max_length=50, blank=True)

    def __str__(self):
        return self.platform

class Resume(models.Model):
    file = models.FileField(upload_to='resumes/')
    uploaded_at = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f"Resume uploaded on {self.uploaded_at}"
