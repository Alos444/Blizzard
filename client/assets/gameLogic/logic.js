class gameState {
  constructor() {
    this.user_highscore = {};
    this.score = 0;
    this.question = {};
    this.character = {};
    this.lives = 3;
    this.event = [];
    this.eventIndex = 0;
  }

  //   static async fetchForUser() {
  //     try {
  //       const response = await fetch(
  //         `https://blizzard-5jur.onrender.com/characters/1`
  //       );

  //       if (response.ok) {
  //         const data = await response.json();
  //         console.log("check data", data);
  //         data.forEach((character) => addEntry(entry)); // Map over all entries
  //       } else {
  //         throw new Error("Error: " + response.status);
  //       }
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   }

  async fetchForCharacter(id) {
    try {
      const response = await fetch(
        `https://blizzard-5jur.onrender.com/characters/${id}`
      );

      if (response.ok) {
        const data = await response.json();
        this.character = data;
      } else {
        throw new Error("Error: " + response.status);
      }
    } catch (err) {
      console.error(err);
    }
  }

  async fetchForEvents(id) {
    try {
      const response = await fetch(
        `https://blizzard-5jur.onrender.com/events/${id}`
      );
      if (response.ok) {
        const data = await response.json();
        this.event = data;
      } else {
        throw new Error("Error: " + response.status);
      }
    } catch (err) {
      console.error(err);
    }
  }

  async fetchForQuestions(id) {
    try {
      const response = await fetch(
        `https://blizzard-5jur.onrender.com/questions/${id}`
      );

      if (response.ok) {
        const data = await response.json();
        this.question = data;
      } else {
        throw new Error("Error: " + response.status);
      }
    } catch (err) {
      console.error(err);
    }
  }

  async checkForAnswers(id) {
    this.eventIndex += 1;

    if (this.question.answer_id < id) {
      this.score += this.question.score;
      return true;
      // this.event.length === this.eventIndex
    } else {
      this.lives -= 1;
      return false;
    }
  }

  async fetchNextQuestion() {
    if (this.eventIndex >= this.event.length) {
      return -1;
    } else {
      await fetchForQuestions(this.event[this.eventIndex].event_id);
      return this.question;
    }
  }

  async sendSubmission(outcome) {
    const options = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: localStorage.getItem("token"),
      },

      body: JSON.stringify({ question_id: this.question.question_id, outcome }),
    };

    const response = await fetch(
      "https://blizzard-5jur.onrender.com/submissions/",
      options
    );

    if (!response.ok) {
      console.log("Error to create submission");
    }
  }

  async init() {
    await this.fetchForCharacter(1);
    await this.fetchForEvents(this.character.character_id);
    await this.fetchForQuestions(this.event[this.eventIndex].event_id);
    // console.log("Fetch for Character", this.character);
    // console.log("Fetch for Events", this.event[this.eventIndex].event_id);
    // console.log("Event Index", this.eventIndex);
    // console.log("Fetch for Questions", this.question);
  }
}

module.exports = gameState;
