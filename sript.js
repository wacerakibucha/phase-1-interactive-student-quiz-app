document.addEventListener("DOMContentLoaded", () => {
  const quizForm = document.getElementById("quiz-form");
  const questionsContainer = document.getElementById("questions-container");
  const resultContainer = document.getElementById("result-container");
  const personalityText = document.getElementById("personality-text");
  const emojiDisplay = document.getElementById("emoji-display");
  const restartBtn = document.getElementById("restart-btn");

  const quizData = [
    { question: "How do you prefer to study?", options: { a:"Plan everything", b:"Last minute", c:"Relaxed pace", d:"Try different methods", e:"Use tech", f:"Creative ways", g:"With friends" }, typeMap:{a:"Overachiever",b:"Procrastinator",c:"Chill Learner",d:"Adaptive Explorer",e:"Tech Enthusiast",f:"Creative Thinker",g:"Social Learner"}},
    { question: "When you get homework, what do you do?", options: { a:"Finish immediately", b:"Delay", c:"Casually", d:"Experiment", e:"Use apps", f:"Add creative touches", g:"Do with friends" }, typeMap:{a:"Overachiever",b:"Procrastinator",c:"Chill Learner",d:"Adaptive Explorer",e:"Tech Enthusiast",f:"Creative Thinker",g:"Social Learner"}},
    { question: "How do you handle difficult tasks?", options: { a:"Plan methodically", b:"Avoid until last minute", c:"Go with the flow", d:"Try new strategies", e:"Use tech", f:"Think creatively", g:"Ask friends" }, typeMap:{a:"Overachiever",b:"Procrastinator",c:"Chill Learner",d:"Adaptive Explorer",e:"Tech Enthusiast",f:"Creative Thinker",g:"Social Learner"}},
    { question: "How do you prefer learning new material?", options: { a:"Structured notes", b:"Skip until needed", c:"Casual reading", d:"Mix methods", e:"Online resources", f:"Visual aids", g:"Group study" }, typeMap:{a:"Overachiever",b:"Procrastinator",c:"Chill Learner",d:"Adaptive Explorer",e:"Tech Enthusiast",f:"Creative Thinker",g:"Social Learner"}},
    { question: "What motivates you most?", options: { a:"Achievement", b:"Deadline pressure", c:"Fun & relaxation", d:"Trying new things", e:"Technology", f:"Creativity", g:"Teamwork" }, typeMap:{a:"Overachiever",b:"Procrastinator",c:"Chill Learner",d:"Adaptive Explorer",e:"Tech Enthusiast",f:"Creative Thinker",g:"Social Learner"}},
    { question: "Preferred environment?", options: { a:"Quiet & organized", b:"Flexible/messy", c:"Relaxed", d:"Varied", e:"Tech-friendly", f:"Creative studio", g:"Collaborative" }, typeMap:{a:"Overachiever",b:"Procrastinator",c:"Chill Learner",d:"Adaptive Explorer",e:"Tech Enthusiast",f:"Creative Thinker",g:"Social Learner"}},
    { question: "Problem solving approach?", options: { a:"Plan methodically", b:"Rush last minute", c:"Go with flow", d:"Experiment", e:"Use tech", f:"Think outside box", g:"Ask peers" }, typeMap:{a:"Overachiever",b:"Procrastinator",c:"Chill Learner",d:"Adaptive Explorer",e:"Tech Enthusiast",f:"Creative Thinker",g:"Social Learner"}},
    { question: "How do you approach exams?", options: { a:"Prepare weeks in advance", b:"Cram night before", c:"Study lightly", d:"Try different methods", e:"Use apps", f:"Make diagrams", g:"Study with friends" }, typeMap:{a:"Overachiever",b:"Procrastinator",c:"Chill Learner",d:"Adaptive Explorer",e:"Tech Enthusiast",f:"Creative Thinker",g:"Social Learner"}},
    { question: "Favorite activity?", options: { a:"Extra studying", b:"Netflix/relax", c:"Casual reading", d:"Exploring hobbies", e:"Coding", f:"Art/design", g:"Social events" }, typeMap:{a:"Overachiever",b:"Procrastinator",c:"Chill Learner",d:"Adaptive Explorer",e:"Tech Enthusiast",f:"Creative Thinker",g:"Social Learner"}},
    { question: "What do you value most in learning?", options: { a:"Achievement", b:"Flexibility", c:"Relaxation", d:"Adaptability", e:"Innovation", f:"Creativity", g:"Collaboration" }, typeMap:{a:"Overachiever",b:"Procrastinator",c:"Chill Learner",d:"Adaptive Explorer",e:"Tech Enthusiast",f:"Creative Thinker",g:"Social Learner"}}
  ];

  const typeEmoji = {
    "Overachiever":"📚",
    "Procrastinator":"🕒",
    "Chill Learner":"😎",
    "Adaptive Explorer":"🎒",
    "Tech Enthusiast":"💻",
    "Creative Thinker":"🎨",
    "Social Learner":"🤝"
  };

  // Render quiz
  function renderQuiz() {
    quizData.forEach((qItem, idx) => {
      const block = document.createElement("div");
      block.classList.add("question-block");

      const qPara = document.createElement("p");
      qPara.textContent = `${idx+1}. ${qItem.question}`;
      block.appendChild(qPara);

      for(let key in qItem.options){
        const label = document.createElement("label");
        const radio = document.createElement("input");
        radio.type="radio";
        radio.name=`q${idx}`;
        radio.value=key;

        const span = document.createElement("span");
        span.textContent = ` ${qItem.options[key]}`;

        label.appendChild(radio);
        label.appendChild(span);
        block.appendChild(label);
      }

      questionsContainer.appendChild(block);
    });
  }

  renderQuiz();

  // Submit handler
  quizForm.addEventListener("submit",(e)=>{
    e.preventDefault();

    const counts = { "Overachiever":0,"Procrastinator":0,"Chill Learner":0,"Adaptive Explorer":0,"Tech Enthusiast":0,"Creative Thinker":0,"Social Learner":0 };

    quizData.forEach((qItem, idx)=>{
      const selected = document.querySelector(`input[name="q${idx}"]:checked`);
      if(selected){
        const type = qItem.typeMap[selected.value];
        counts[type]++;
      }
    });

    // Determine highest score
    let maxCount = 0;
    let personality = "";
    for(let key in counts){
      if(counts[key]>maxCount){
        maxCount=counts[key];
        personality=key;
      }
    }

    // Show result
    personalityText.textContent = `${personality} (${maxCount} points)`;
    emojiDisplay.textContent = typeEmoji[personality];

    quizForm.classList.add("hidden");
    resultContainer.classList.remove("hidden");
  });

  // Restart quiz
  restartBtn.addEventListener("click",()=>{
    quizForm.reset();
    quizForm.classList.remove("hidden");
    resultContainer.classList.add("hidden");
  });
});
