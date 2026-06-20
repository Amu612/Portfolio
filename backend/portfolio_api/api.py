from rest_framework import serializers, viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAdminUser
from projects.models import Project, ProjectTechnology, ProjectImage, ProjectVideo, ProjectDocument
from skills.models import Skill
from experience.models import Experience
from achievements.models import Achievement
from certifications.models import Certification
from blog.models import Blog, BlogCategory, BlogTag
from contact.models import ContactMessage
from analytics.models import Visitor, Analytics
from core.models import SiteSettings, SocialLinks, Resume

# Serializers
class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'

class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = '__all__'

class ExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experience
        fields = '__all__'

class AchievementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Achievement
        fields = '__all__'

class CertificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Certification
        fields = '__all__'

class BlogSerializer(serializers.ModelSerializer):
    class Meta:
        model = Blog
        fields = '__all__'

class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = '__all__'

class SiteSettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = SiteSettings
        fields = '__all__'

class SocialLinksSerializer(serializers.ModelSerializer):
    class Meta:
        model = SocialLinks
        fields = '__all__'

class ResumeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Resume
        fields = '__all__'

# ViewSets
class BaseViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticatedOrReadOnly]

class ProjectViewSet(BaseViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    filterset_fields = ['is_featured']

class SkillViewSet(BaseViewSet):
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer
    filterset_fields = ['category']

class ExperienceViewSet(BaseViewSet):
    queryset = Experience.objects.all()
    serializer_class = ExperienceSerializer

class AchievementViewSet(BaseViewSet):
    queryset = Achievement.objects.all()
    serializer_class = AchievementSerializer

class CertificationViewSet(BaseViewSet):
    queryset = Certification.objects.all()
    serializer_class = CertificationSerializer

class BlogViewSet(BaseViewSet):
    queryset = Blog.objects.filter(is_published=True)
    serializer_class = BlogSerializer
    filterset_fields = ['category']

class ContactMessageViewSet(viewsets.ModelViewSet):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer
    
    def get_permissions(self):
        if self.action == 'create':
            return []
        return [IsAdminUser()]

class SiteSettingsViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = SiteSettings.objects.all()
    serializer_class = SiteSettingsSerializer

class SocialLinksViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = SocialLinks.objects.all()
    serializer_class = SocialLinksSerializer

class ResumeViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Resume.objects.filter(is_active=True)
    serializer_class = ResumeSerializer
