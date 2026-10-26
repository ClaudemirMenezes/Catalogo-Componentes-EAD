export default {
  name: 'Chat',

  props: {
    character: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    message: {
      type: String,
      required: true
    }
  },

  computed: {
    isTeacher() {
      return this.character.toLowerCase() === 'teacher';
    }
  },

  template: `
    <div :class="['chat-avatar-container', isTeacher ? 'teacher-layout' : 'student-layout']">
      <img 
        :src="image" 
        :alt="character" 
        class="chat-avatar-image" 
      />

      <div class="chat-message-bubble">
        <p v-html="message"></p>
      </div>
    </div>
  `
};

/*
    Como utilizar o componente:
        

       <Chat
          character="teacher"
          image="/images/professor.png"
          message="Olá, turma! Hoje vamos estudar <strong>frações</strong>."
        />

      <Chat
        character="student"
        image="/images/aluno.png"
        message="Professora, ainda tenho dúvidas sobre <em>frações equivalentes</em>."
      />

      <Chat
        character="teacher"
        image="/images/professor.png"
        message="Não se preocupe! Vamos praticar juntos."
      />
        
*/