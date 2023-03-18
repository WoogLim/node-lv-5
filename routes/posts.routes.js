const express = require('express');
const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");
const PostsController = require('../controller/posts.controller');


const postController = new PostsController();

// 게시글 작성
router.post('/',authMiddleware, postController.writePost);
// 게시글 조회
router.get('/', postController.getPosts);
// 게시글 상세 조회
router.get('/:postId', postController.getPost);
// 게시글 수정
router.put('/', authMiddleware, postController.updatePost);
// 게시글 삭제
router.delete('/', authMiddleware, postController.deletePost);

module.exports = router;
