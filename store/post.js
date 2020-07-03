const posts = [
  {title: 'Post 1', date: new Date(), views: 22, comments: [1, 2], _id: 'id1'},
  {title: 'Post 2', date: new Date(), views: 10, comments: [1, 2], _id: 'id2'},
];

export const actions = {
  async fetch({commit}) {
    try {
      return await this.$axios.$get('/api/post');
    } catch (e) {
      commit('setError', e, {root: true});
      throw e; // throw to create component
    }
  },
  async fetchById({commit}, id) {
    try {
      return await this.$axios.$get(`/api/post/${id}`);
    } catch (e) {
      commit('setError', e, {root: true});
      throw e;
    }
  },
  async addView({commit}, {_id, views}) {
    try {
      return await this.$axios.$put(`/api/post/add/view/${_id}`, {views});
    } catch (e) {
      commit('setError', e, {root: true});
      throw e;
    }
  },
  async fetchAdmin({commit}) {
    try {
      return await this.$axios.$get('/api/post/admin');
    } catch (e) {
      commit('setError', e, {root: true});
      throw e;
    }
  },
  async fetchAdminById({commit}, id) {
    try {
      return await this.$axios.$get(`/api/post/admin/${id}`);
    } catch (e) {
      commit('setError', e, {root: true});
      throw e;
    }
  },
  async create({commit}, {title, text, image}) {
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('text', text);
      formData.append('image', image, image.name);

      return await this.$axios.$post('/api/post/admin', formData);

    } catch (e) {
      commit('setError', e, {root: true});
      throw e;
    }
  },
  async remove({commit}, id) {
    try {
      return await this.$axios.$delete(`/api/post/admin/${id}`);
    } catch (e) {
      commit('setError', e, {root: true});
      throw e;
    }
  },
  async update({commit}, {text, id}) {
    try {
      return await this.$axios.$put(`/api/post/admin/${id}`, {text});
    } catch (e) {
      commit('setError', e, {root: true});
      throw e;
    }
  },
}
