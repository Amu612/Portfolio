from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from portfolio_api.api import (
    ProjectViewSet, SkillViewSet, ExperienceViewSet,
    AchievementViewSet, CertificationViewSet, BlogViewSet,
    ContactMessageViewSet, SiteSettingsViewSet, SocialLinksViewSet, ResumeViewSet
)

router = DefaultRouter()
router.register(r'projects', ProjectViewSet)
router.register(r'skills', SkillViewSet)
router.register(r'experience', ExperienceViewSet)
router.register(r'achievements', AchievementViewSet)
router.register(r'certifications', CertificationViewSet)
router.register(r'blog', BlogViewSet)
router.register(r'contact', ContactMessageViewSet)
router.register(r'settings', SiteSettingsViewSet)
router.register(r'social', SocialLinksViewSet)
router.register(r'resume', ResumeViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/', include(router.urls)),
    path('api/v1/auth/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/v1/auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
