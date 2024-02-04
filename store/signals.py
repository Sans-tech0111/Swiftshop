from django.contrib.auth.signals import user_logged_in
from django.dispatch import receiver
from .models import Customer  # Import your Customer model

@receiver(user_logged_in)
def create_customer(sender, request, user, **kwargs):
    # Check if the Customer object already exists for the user
    if not hasattr(user, 'customer'):
        # If not, create a Customer object for the user
        Customer.objects.create(user=user)
