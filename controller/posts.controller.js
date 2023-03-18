const Joi = require('joi');
const PostService = require('../services/posts.service');

class PostController {
  postService = new PostService();

  /**
   * Controller : 게시글 작성
   */
  writePost = async (req, res, next) => {
    try {
      // 파라미터
      {}
      // 파라미터 검증
      // 검증 에러 핸들링
      // service 요청
      // 에러 유무 throw
    } catch (err) {}
  };

  /**
   * Controller : 게시글 조회
   */
  getPosts = async (req, res, next) => {
    try {
      // 파라미터
      {}
      // 파라미터 검증
      // 검증 에러 핸들링
      // service 요청
      // 에러 유무 throw
    } catch (err) {}
  };

  /**
   * Controller : 게시글 상세 조회
   */
  getPost = async (req, res, next) => {
    try {
      // 파라미터
      {}
      // 파라미터 검증
      // 검증 에러 핸들링
      // service 요청
      // 에러 유무 throw
    } catch (err) {}
  };

  /**
   * Controller : 게시글 수정
   */
  updatePost = async (req, res, next) => {
    try {
      // 파라미터
      {}
      // 파라미터 검증
      // 검증 에러 핸들링
      // service 요청
      // 에러 유무 throw
    } catch (err) {}
  };

  /**
   * Controller : 게시글 삭제
   */
  deletePost = async (req, res, next) => {
    try {
      // 파라미터
      {}
      // 파라미터 검증
      // 검증 에러 핸들링
      // service 요청
      // 에러 유무 throw
    } catch (err) {}
  };
}

module.exports = PostController;
