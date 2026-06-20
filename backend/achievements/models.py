from django.db import models

class Achievement(models.Model):
    title = models.CharField(max_length=200)
    date_achieved = models.DateField()
    description = models.TextField()
    url = models.URLField(blank=True, null=True)

    def __str__(self):
        return self.title
