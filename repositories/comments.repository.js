const { Comments } = require('../models');

class CommentRepository {
  /**
   * Repository : 댓글 작성
   */
  writeComment = async (postId, userId, parentCommentId, content) => {
    const createComment = await Comments.create({
      postId,
      userId,
      parentCommentId,
      content,
    });

    return createComment;
  };

  /**
   * Repository : 댓글 목록 조회
   */
  getComments = async (postId) => {
    const comments = await Comments.findAll({
      where: { postId },
      order: [['createdAt', 'DESC']],
    });

    return comments;
  };

  /**
   * Repository : 댓글 수정
   */
  updateComment = async (commentId, postId, userId, content) => {
    const updateComment = await Comments.update(
      {
        content,
      },
      {
        where: {
          [Op.and]: [{ postId }, { commentId }, { userId }],
        },
      }
    );

    return updateComment;
  };

  /**
   * Repository : 댓글 삭제
   */
  deleteComment = async (commentId, postId, userId) => {
    const deleteComment = await Comments.destroy({
      where: {
        [Op.and]: [{ postId }, { commentId }, { userId }],
      },
    });

    return deleteComment;
  };
}

module.exports = CommentRepository;
