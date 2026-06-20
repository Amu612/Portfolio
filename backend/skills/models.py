from django.db import models

class Skill(models.Model):
    name = models.CharField(max_length=100)
    category = models.CharField(max_length=100) # e.g. "AI/ML", "Backend"
    proficiency = models.IntegerField(default=5) # 1-5
    icon_url = models.URLField(blank=True, null=True)

    def __str__(self):
        return self.name
