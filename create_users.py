from app import create_app
from app.models import User
from app.extensions import db

app = create_app()

with app.app_context():
    db.create_all()  # just in case

    # Delete old users if exist (optional)
    User.query.delete()

    admin = User(username='admin', role='admin')
    admin.set_password('admin123')
    db.session.add(admin)

    analyst = User(username='analyst', role='analyst')
    analyst.set_password('analyst123')
    db.session.add(analyst)

    db.session.commit()
    print("Default users created:")
    print("- admin / admin123 (admin role)")
    print("- analyst / analyst123 (analyst role)")