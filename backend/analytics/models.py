from django.db import models

class Visitor(models.Model):
    ip_address = models.GenericIPAddressField()
    user_agent = models.TextField(blank=True, null=True)
    last_visited = models.DateTimeField(auto_now=True)
    visit_count = models.IntegerField(default=1)

    def __str__(self):
        return self.ip_address

class Analytics(models.Model):
    date = models.DateField(unique=True)
    page_views = models.IntegerField(default=0)
    unique_visitors = models.IntegerField(default=0)

    def __str__(self):
        return str(self.date)
