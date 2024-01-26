from random import random
from flask import Flask, request, jsonify, session
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flask_session import Session
from config import ApplicationConfig
from models import db, User
import random

app = Flask(__name__)
app.config.from_object(ApplicationConfig)

bcrypt = Bcrypt(app)
CORS(app, supports_credentials=True)
server_session = Session(app)
db.init_app(app)

with app.app_context():
    db.create_all()

@app.route("/@me")
def get_current_user():
    user_id = session.get("user_id")

    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401
    
    user = User.query.filter_by(id=user_id).first()
    return jsonify({
        "id": user.id,
        "email": user.email
    }) 

@app.route("/register", methods=["POST"])
def register_user():
    email = request.json["email"]
    password = request.json["password"]

    user_exists = User.query.filter_by(email=email).first() is not None

    if user_exists:
        return jsonify({"error": "User already exists"}), 409

    hashed_password = bcrypt.generate_password_hash(password)
    new_user = User(email=email, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()
    
    session["user_id"] = new_user.id

    return jsonify({
        "id": new_user.id,
        "email": new_user.email
    })

@app.route("/login", methods=["POST"])
def login_user():
    email = request.json["email"]
    password = request.json["password"]

    user = User.query.filter_by(email=email).first()

    if user is None:
        return jsonify({"error": "Unauthorized"}), 401

    if not bcrypt.check_password_hash(user.password, password):
        return jsonify({"error": "Unauthorized"}), 401
    
    session["user_id"] = user.id

    return jsonify({
        "id": user.id,
        "email": user.email
    })

@app.route("/logout", methods=["POST"])
def logout_user():
    session.pop("user_id")
    return "200"



# @app.route('/play', methods=['POST'])
# def computer_game():
#     options = ['rock, paper, scissors']
#     return options[random.randint(0,2)]

# def run_game(computer_move, player_move):
#     if computer_move == player_move:
#         winner = 'tie'
#     elif computer_move == 'scissors' and player_move == 'paper':
#         winner = 'computer'
#     elif computer_move == 'paper' and player_move == 'rock':
#         winner = 'computer'
#     elif computer_move == 'rock' and player_move == 'scissors':
#         winner = 'computer'
#     else:
#         winner = 'player'
        
#     return winner

# def play_game(player_move):
#     computer =computer_game()
#     player = player_move
#     winner = run_game(computer, player)
#     return winner




# @app.route('/play', methods=['POST'])
# def play_game():
#     data = request.get_json()

#     if 'player_choice' not in data:
#         return jsonify({'error': 'Please provide player_choice in the request body'}), 400

#     player_choice = data['player_choice'].lower()
#     choices = ['rock', 'paper', 'scissors']

#     if player_choice not in choices:
#         return jsonify({'error': 'Invalid choice. Choose from: rock, paper, scissors'}), 400

#     computer_choice = random(choices)

#     result = determine_winner(player_choice, computer_choice)

#     return jsonify({
#         'player_choice': player_choice,
#         'computer_choice': computer_choice,
#         'result': result
#     })

# def determine_winner(player_choice, computer_choice):
#     if player_choice == computer_choice:
#         return 'It\'s a tie!'
#     elif (
#         (player_choice == 'rock' and computer_choice == 'scissors') or
#         (player_choice == 'paper' and computer_choice == 'rock') or
#         (player_choice == 'scissors' and computer_choice == 'paper')
#     ):
#         return 'You win!'
#     else:
#         return 'Computer wins!'



games = {}


@app.route('/new_game', methods=['POST'])
def new_game():
    game_id = str(random.randint(1000, 9999))
    
    games[game_id] = {'player': '', 'computer': '', 'result': ''}
    print(game_id)
    return jsonify({'game_id': game_id})


@app.route('/play/<game_id>', methods=['POST'])
def play_round(game_id):
    if game_id not in games:
        return jsonify({'error': 'Invalid game ID'}), 400
    
    data = request.get_json()
    player_choice = data.get('player_choice', '').lower()
    
    if player_choice not in ['rock', 'paper', 'scissors']:
        return jsonify({'error': 'Invalid choice. Choose from: rock, paper, scissors'}), 400
    
    computer_choice = random.choice(['rock', 'paper', 'scissors'])
    
    result = determine_winner(player_choice, computer_choice)
    
    games[game_id]['player'] = player_choice
    games[game_id]['computer'] = computer_choice
    games[game_id]['result'] = result
    
    return jsonify({'player_choice': player_choice, 'computer_choice': computer_choice, 'result': result})


def determine_winner(player_choice, computer_choice):
    if player_choice == computer_choice:
        return 'It\'s a tie!'
    elif (
        (player_choice == 'rock' and computer_choice == 'scissors') or
        (player_choice == 'paper' and computer_choice == 'rock') or
        (player_choice == 'scissors' and computer_choice == 'paper')
    ):
        return 'You win!'
    else:
        return 'Computer wins!'


if __name__ == "__main__":
    app.run(debug=True)