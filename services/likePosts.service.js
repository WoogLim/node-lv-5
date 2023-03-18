const LikePostsRepository = require('../repositories/likePosts.repository');

class LikePostsService {
  likePostsRepository = new LikePostsRepository();

  /**
   * Service : 게시글 좋아요
   */
  updateLike = async (postId, userId) => {
    const updateLike = await this.likePostsRepository.updateLike(
      postId,
      userId
    );
    return updateLike;
  };
  /**
   * Service : 좋아요한 게시글 조회
   */
  searchLikePosts = async (userId) => {
    const searchLikePosts = await this.likePostsRepository.searchLikePosts(
      userId
    );
    return searchLikePosts;
  };
}

module.exports = LikePostsService;
