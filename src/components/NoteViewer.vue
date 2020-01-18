<template>
  <div class="container">
    <div class="card note-card">
      <div class="card-header">
        <div class="card-header-title title">
          <div class="column is-6">
            <p>Created at {{ note.content.createdAt }}</p>
          </div>
          <div class="column is-6 ">
            <div class="buttons is-pulled-right">
              <button
                v-show="!note.content.isCompleted"
                class="button is-success is-small "
                title="Mark Completed"
                @click="markCompleted"
              >
                <b-icon pack="fas" icon="check" size="is-small" />
              </button>
              <button
                v-show="!note.content.isCompleted"
                class="button is-primary is-small"
                title="Edit Note"
                @click="editNote"
              >
                <b-icon pack="fas" icon="pen" size="is-small" />
              </button>
              <button
                class="button is-primary is-small "
                title="Delete Note"
                @click="deleteNote"
              >
                <b-icon pack="fas" icon="trash" size="is-small" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        class="card-content"
        :class="note.content.isCompleted ? 'note-completed' : ''"
      >
        <strong>{{ note.content.title }}</strong>
        <p>{{ note.content.description }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NoteViewer",
  props: {
    note: {
      type: Object,
      required: true
    }
  },
  methods: {
    editNote() {
      this.$emit("edit", this.note);
    },
    deleteNote() {
      this.$emit("delete", this.note);
    },
    markCompleted() {
      this.$emit("markCompleted", this.note);
    }
  }
};
</script>

<style></style>
