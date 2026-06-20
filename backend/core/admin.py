from django.contrib import admin
from projects.models import Project, ProjectTechnology, ProjectImage, ProjectVideo, ProjectDocument
from skills.models import Skill
from experience.models import Experience
from achievements.models import Achievement
from certifications.models import Certification
from blog.models import Blog, BlogCategory, BlogTag
from contact.models import ContactMessage
from analytics.models import Visitor, Analytics
from core.models import SiteSettings, SocialLinks, Resume

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'is_featured', 'created_at')
    search_fields = ('title', 'description')
    prepopulated_fields = {'slug': ('title',)}

@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'proficiency')
    list_filter = ('category',)
    search_fields = ('name',)

@admin.register(Experience)
class ExperienceAdmin(admin.ModelAdmin):
    list_display = ('role', 'company', 'start_date', 'is_current')
    list_filter = ('is_current',)

@admin.register(Achievement)
class AchievementAdmin(admin.ModelAdmin):
    list_display = ('title', 'date_achieved')

@admin.register(Certification)
class CertificationAdmin(admin.ModelAdmin):
    list_display = ('name', 'issuer', 'date_issued')

@admin.register(Blog)
class BlogAdmin(admin.ModelAdmin):
    list_display = ('title', 'is_published', 'created_at')
    list_filter = ('is_published', 'category')
    prepopulated_fields = {'slug': ('title',)}

@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'subject', 'created_at', 'is_read')
    list_filter = ('is_read',)

admin.site.register(BlogCategory)
admin.site.register(BlogTag)
admin.site.register(Visitor)
admin.site.register(Analytics)
admin.site.register(SiteSettings)
admin.site.register(SocialLinks)
admin.site.register(Resume)
admin.site.register(ProjectTechnology)
admin.site.register(ProjectImage)
admin.site.register(ProjectVideo)
admin.site.register(ProjectDocument)
