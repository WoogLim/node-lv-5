const { Posts } = require('../models');

class PostRepository {
  /**
   * Repository : 게시글 작성
   */
  writePost = async (userId, title, introduce, content, thumnail) => {
    const createPost = await Posts.create({
      userId,
      title,
      introduce,
      content,
      thumnail,
    });

    return createPost;
  };

  /**
   * Repository : 게시글 목록 조회
   */
  getPosts = async (search) => {
    let posts = null;

    if (!search) {
      posts = await Posts.findAll({
        attributes: {
          include: [
            [
              sequelize.fn('COUNT', sequelize.col('Likes.postId')),
              'like_count',
            ],
          ],
        },
        include: [
          {
            model: Likes,
            attributes: [],
          },
        ],
        group: ['Posts.postId'],
        order: [['createdAt', 'DESC']],
      });
    } else {
      posts = await Posts.findAll({
        attributes: {
          include: [
            [
              sequelize.fn('COUNT', sequelize.col('Likes.postId')),
              'like_count',
            ],
          ],
        },
        include: [
          {
            model: Likes,
            attributes: [],
          },
        ],
        group: ['Posts.postId'],
        order: [['createdAt', 'DESC']],
        where: {
          title: {
            [Op.substring]: search,
          },
          content: {
            [Op.substring]: search,
          },
        },
      });
    }

    return posts;
  };

  /**
   * Repository : 게시글 상세 조회
   */
  getPost = async (postId) => {
    const post = await Posts.findOne({
      attributes: {
        include: [
          [sequelize.fn('COUNT', sequelize.col('Likes.postId')), 'like_count'],
        ],
      },
      include: [
        {
          model: Likes,
          attributes: [],
        },
      ],
      where: {
        postId,
      },
      group: ['Posts.postId'],
      order: [['createdAt', 'DESC']],
    });

    return post;
  };

  /**
   * Repository : 게시글 수정
   */
  updatePost = async (userId, postId, title, introduce, content, thumnail) => {
    const updatedPost = await Posts.update(
      {
        title,
        introduce,
        content,
        thumnail,
      },
      {
        where: {
          postId,
          userId,
        },
      }
    );

    return updatedPost;
  };

  /**
   * Repository : 게시글 삭제
   */
  deletePost = async (userId, postId) => {
    const deletedPost = await Posts.destroy({
      where: {
        postId,
        userId,
      },
    });

    return deletedPost;
  };
}

module.exports = PostRepository;
