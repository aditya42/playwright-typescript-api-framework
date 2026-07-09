import { PostPayload } from '../../src/models/post.model';
import { randomId } from '../../src/utils/random.util';

export function buildPostPayload(overrides: Partial<PostPayload> = {}): PostPayload {
  const uniqueValue = randomId('post');

  return {
    userId: 1,
    title: `Playwright API automation ${uniqueValue}`,
    body: `Sample body generated for ${uniqueValue}`,
    ...overrides,
  };
}
