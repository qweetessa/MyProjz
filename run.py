from app import create_app

app = create_app()

if __name__ == '__main__':
    with app.app_context():
        from app.extensions import db
        db.create_all()
        print("✅ Database tables created (if not already present)")
    app.run(
        debug=True,
        host='127.0.0.1',      # force IPv4 localhost
        port=8000,
        use_reloader=False     # disable auto-reload (common cause of binding failure on Windows)
    )
    app.run(debug=True, host='127.0.0.1', port=8000, use_reloader=False, threaded=True)