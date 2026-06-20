from django.core.management.base import BaseCommand
from projects.models import Project, ProjectTechnology
from skills.models import Skill
from experience.models import Experience
from achievements.models import Achievement
from certifications.models import Certification

class Command(BaseCommand):
    help = 'Seeds the database with Amulya Anamdasu portfolio data'

    def handle(self, *args, **kwargs):
        self.stdout.write('Seeding data...')
        
        # Experience
        Experience.objects.get_or_create(
            company='Cyber Shadez',
            role='AI/ML Developer',
            start_date='2022-01-01',
            is_current=False,
            description='Developed intelligent systems.'
        )
        Experience.objects.get_or_create(
            company='PIERC',
            role='Full Stack Developer',
            start_date='2023-01-01',
            is_current=True,
            description='Built scalable applications.'
        )

        # Achievements
        Achievement.objects.get_or_create(
            title='SIH 2024 Finalist',
            date_achieved='2024-11-01',
            description='Smart India Hackathon Finalist'
        )
        Achievement.objects.get_or_create(
            title='Ingenious 7.0',
            date_achieved='2023-06-01',
            description='Won Ingenious 7.0 Hackathon'
        )

        # Projects
        p, created = Project.objects.get_or_create(
            title='CO2 Digital Twin Dashboard',
            slug='co2-digital-twin',
            description='An advanced environmental simulation platform.',
            is_featured=True,
            github_url='https://github.com/amulya-anamdasu/co2-dashboard'
        )
        if created:
            ProjectTechnology.objects.create(project=p, name='React')
            ProjectTechnology.objects.create(project=p, name='Three.js')

        p2, created = Project.objects.get_or_create(
            title='Automated CV Pipeline',
            slug='auto-cv-pipeline',
            description='A high-throughput computer vision pipeline using PyTorch.',
            is_featured=True,
            github_url='https://github.com/amulya-anamdasu/cv-pipeline'
        )
        if created:
            ProjectTechnology.objects.create(project=p2, name='PyTorch')
            ProjectTechnology.objects.create(project=p2, name='FastAPI')

        # Skills
        Skill.objects.get_or_create(name='Python', category='AI/ML', proficiency=5)
        Skill.objects.get_or_create(name='TensorFlow', category='AI/ML', proficiency=4)
        Skill.objects.get_or_create(name='Next.js', category='Frontend', proficiency=5)
        Skill.objects.get_or_create(name='Django', category='Backend', proficiency=4)

        self.stdout.write(self.style.SUCCESS('Successfully seeded data'))
