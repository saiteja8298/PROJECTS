from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allow all origins for development

@app.route('/chatbot', methods=['POST'])
def chatbot():
    data = request.get_json()
    message = data.get("message", "").lower()
    tours = data.get("tours", [])
    guides = data.get("guideData", [])

    if "recommend" in message or "tour" in message:
        if tours:
            top_tours = sorted(tours, key=lambda x: -x.get("avgRating", 0))[:3]
            response = "Here are some top tours:\n" + "\n".join(
                f"- {t['title']} in {t['city']} (${t['price']})" for t in top_tours
            )
        else:
            response = "No tour data found."

    elif "guide" in message:
        if guides:
            top_guides = sorted(guides, key=lambda x: -x.get("rating", 0))[:3]
            response = "Here are some great tour guides:\n" + "\n".join(
                f"- {g['name']} from {g['country']} (Rating: {g['rating']})" for g in top_guides
            )
        else:
            response = "No guide data found."

    else:
        response = (
            "Hi there! You can ask me to recommend a tour or find a guide. "
            "Just say things like 'recommend a tour in France' or 'find a guide in Japan'."
        )

    return jsonify({"reply": response})

if __name__ == '__main__':
    app.run(debug=True)
