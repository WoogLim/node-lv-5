const PostRepository = require('../repositories/posts.repository');

class PostService {
  postRepository = new PostRepository();

  /**
   * Service : 게시글 작성
   */
  writePost = async (userId, title, introduce, content, thumnail) => {
    const createPost = await this.postRepository.writePost(
      userId,
      title,
      introduce,
      content,
      thumnail
    );
    return createPost;
  };

  /**
   * Service : 게시글 조회
   */
  getPosts = async (search) => {
    const searchPosts = await this.postRepository.getPosts(search);
    return searchPosts;
  };

  /**
   * Service : 게시글 상세 조회
   */
  getPost = async (postId) => {
    const searchPost = await this.postRepository.getPost(postId);
    return searchPost;
  };

  /**
   * Service : 게시글 수정
   */
  updatePost = async (postId) => {
    const updatePost = await this.postRepository.updatePost(
      userId,
      postId,
      title,
      introduce,
      content,
      thumnail
    );
    return updatePost;
  };

  /**
   * Service : 게시글 삭제
   */
  deletePost = async (userId, postId) => {
    const deletePost = await this.postRepository.deletePost(userId, postId);
    return deletePost;
  };
}

module.exports = PostService;
