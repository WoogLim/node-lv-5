const CommentRepository = require('../repositories/comments.repository');

class CommentService {
  commentRepository = new CommentRepository();

  /**
   * Service : 댓글 작성
   */
  writeComment = async (postId, userId, parentCommentId, content) => {
    const createComment = await this.commentRepository.writeComment(
      postId,
      userId,
      parentCommentId,
      content
    );
    return createComment;
  };

  /**
   * Service : 댓글 목록 조회
   */
  searchComments = async (postId) => {
    const searchComments = await this.commentRepository.getComments(postId);
    return searchComments;
  };

  /**
   * Service : 댓글 수정
   */
  updateComment = async (postId, userId, parentCommentId, content) => {
    const updateComment = await this.commentRepository.updateComment(
      postId,
      userId,
      parentCommentId,
      content
    );
    return updateComment;
  };

  /**
   * Service : 댓글 삭제
   */
  deleteComment = async (commentId, postId, userId) => {
    const deleteComment = await this.commentRepository.deleteComment(
      commentId,
      postId,
      userId
    );
    return deleteComment;
  };
}

module.exports = CommentService;
