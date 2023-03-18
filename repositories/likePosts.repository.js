const { LikePosts, Posts } = require('../models');

class CommentRepository {
  /**
   * Repository : 게시글 좋아요
   */
  updateLike = async (postId, userId) => {
    const updateLike = await LikePosts.findOrCreate({
      where: {
        [Op.and]: [{ postId }, { userId: user.userId }],
      },
      defaults: {
        postId,
        userId,
      },
    }).then(([data, created]) => {
      if (!created) {
        // 데이터가 존재
        data.destroy();
        return 'delete';
      }
      return 'create';
    });

    return updateLike;
  };

  /**
   * Repository : 좋아요한 게시글 조회
   */
  searchLikePosts = async (userId) => {
    const searchLikePosts = await LikePosts.findAll({
      where: {
        userId,
      },
      attributes: ['postId'],
    }).then((data) => {
      const postIdArray = data.map((item) => item.postId);

      return Posts.findAll({
        where: {
          postId: {
            [Op.or]: postIdArray,
          },
        },
        order: [['createdAt', 'DESC']],
      });
    });

    return searchLikePosts;
  };
}

module.exports = CommentRepository;
