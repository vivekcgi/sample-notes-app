<template>
  <div class="container">
    <div class="columns">
      <div class="column is-12">
        <button
          class="button is-primary is-small is-pulled-right"
          title="Add New Note"
          @click="enableAdd()"
        >
          <b-icon pack="fas" icon="plus" size="is-small" />
        </button>
      </div>
    </div>
    <div class="columns">
      <div class="column is-12">
        <note-editor
          v-show="enableAddNote"
          :key="enableAddNote"
          @add="addNote"
          @cancel="disableAdd"
        />

        <div v-for="(note, index) in data" :key="index">
          <note-viewer
            v-show="note.viewMode"
            :note="note"
            @edit="editNote"
            @markCompleted="markCompletedConfirm"
            @delete="deleteNoteConfirm"
          />

          <note-editor
            v-show="!note.viewMode"
            :add-mode="false"
            :note="note"
            @update="updateNote"
            @cancel="cancelUpdate(note)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import NoteEditor from "@/components/NoteEditor.vue";
import NoteEditor from "@/components/Add.vue";
import NoteViewer from "@/components/NoteViewer.vue";
export default {
  name: "Home",
  components: {
    // NoteEditor,
    NoteEditor,
    NoteViewer
  },
  data() {
    return {
      enableAddNote: false,
      data: []
    };
  },
  mounted() {
    this.getNotes();
  },
  methods: {
    enableAdd() {
      this.enableAddNote = true;
    },
    disableAdd() {
      this.enableAddNote = false;
    },
    async getNotes() {
      this.data = [];
      const data = await this.$http.get("notes/getall");
      data.forEach(note => {
        this.data.push({
          content: note,
          viewMode: true
        });
      });
    },
    async addNote(note) {
      await this.$http.post("notes/create", note.content);
      this.disableAdd();
      await this.getNotes();
    },
    editNote(note) {
      note.viewMode = false;
    },
    async updateNote(note) {
      await this.$http.put(`notes/${note.content.id}`, note.content);
      note.viewMode = true;
      await this.getNotes();
    },
    cancelUpdate(note) {
      note.viewMode = true;
    },
    markCompletedConfirm(note) {
      this.$buefy.dialog.confirm({
        title: "Mark Completed",
        message: "Would you really like to mark the note completed?",
        type: "is-warning",
        hasIcon: true,
        onConfirm: async () => await this.markCompleted(note)
      });
    },
    async markCompleted(note) {
      note.content.isCompleted = true;
      await this.$http.put(`notes/${note.content.id}`, note.content);
      await this.getNotes();
    },
    deleteNoteConfirm(note) {
      this.$buefy.dialog.confirm({
        title: "Delete note",
        message: "Would you really like to delete the note?",
        type: "is-danger",
        hasIcon: true,
        onConfirm: async () => await this.deleteNote(note)
      });
    },
    async deleteNote(note) {
      await this.$http.delete(`notes/${note.content.id}`);
      await this.getNotes();
    }
  }
};
</script>
