import { test, expect } from '@playwright/test';
import { PostsApiClient } from '../../src/clients/posts.api-client';
import { Post } from '../../src/models/post.model';
import { expectStatus, parseJsonResponse } from '../../src/utils/response.util';
import { buildPostPayload } from '../data/post.data';

test.describe('Posts API', () => {
  let postsClient: PostsApiClient;

  test.beforeEach(async ({ request }) => {
    postsClient = new PostsApiClient(request);
  });

  test('GET /posts should return list of posts @smoke @regression', async () => {
    const response = await postsClient.getAllPosts();

    await expectStatus(response, 200);
    const posts = await parseJsonResponse<Post[]>(response);

    expect(posts.length).toBeGreaterThan(0);
    expect(posts[0]).toEqual(
      expect.objectContaining({
        userId: expect.any(Number),
        id: expect.any(Number),
        title: expect.any(String),
        body: expect.any(String),
      }),
    );
  });

  test('GET /posts/{id} should return expected post details @smoke', async () => {
    const response = await postsClient.getPostById(1);

    await expectStatus(response, 200);
    const post = await parseJsonResponse<Post>(response);

    expect(post.id).toBe(1);
    expect(post.userId).toBe(1);
    expect(post.title).toBeTruthy();
    expect(post.body).toBeTruthy();
  });

  test('POST /posts should create a post @regression', async () => {
    const payload = buildPostPayload();
    const response = await postsClient.createPost(payload);

    await expectStatus(response, 201);
    const createdPost = await parseJsonResponse<Post>(response);

    expect(createdPost.userId).toBe(payload.userId);
    expect(createdPost.title).toBe(payload.title);
    expect(createdPost.body).toBe(payload.body);
    expect(createdPost.id).toBeDefined();
  });

  test('PUT /posts/{id} should update complete post @regression', async () => {
    const payload = buildPostPayload({ title: 'Updated complete post title' });
    const response = await postsClient.updatePost(1, payload);

    await expectStatus(response, 200);
    const updatedPost = await parseJsonResponse<Post>(response);

    expect(updatedPost.id).toBe(1);
    expect(updatedPost.userId).toBe(payload.userId);
    expect(updatedPost.title).toBe(payload.title);
    expect(updatedPost.body).toBe(payload.body);
  });

  test('PATCH /posts/{id} should partially update post @regression', async () => {
    const response = await postsClient.patchPost(1, { title: 'Partially updated title' });

    await expectStatus(response, 200);
    const patchedPost = await parseJsonResponse<Post>(response);

    expect(patchedPost.id).toBe(1);
    expect(patchedPost.title).toBe('Partially updated title');
  });

  test('DELETE /posts/{id} should delete post @regression', async () => {
    const response = await postsClient.deletePost(1);

    await expectStatus(response, 200);
  });
});
