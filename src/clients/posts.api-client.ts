import { APIRequestContext, APIResponse } from '@playwright/test';
import { BaseApiClient } from './base.api-client';
import { PostPayload } from '../models/post.model';

export class PostsApiClient extends BaseApiClient {
  constructor(request: APIRequestContext) {
    super(request);
  }

  getAllPosts(): Promise<APIResponse> {
    return this.get('/posts');
  }

  getPostById(postId: number): Promise<APIResponse> {
    return this.get(`/posts/${postId}`);
  }

  createPost(payload: PostPayload): Promise<APIResponse> {
    return this.post('/posts', payload);
  }

  updatePost(postId: number, payload: PostPayload): Promise<APIResponse> {
    return this.put(`/posts/${postId}`, payload);
  }

  patchPost(postId: number, payload: Partial<PostPayload>): Promise<APIResponse> {
    return this.patch(`/posts/${postId}`, payload);
  }

  deletePost(postId: number): Promise<APIResponse> {
    return this.delete(`/posts/${postId}`);
  }
}
