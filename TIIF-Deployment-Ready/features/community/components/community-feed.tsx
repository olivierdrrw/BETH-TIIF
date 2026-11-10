import { CommunityPost }
from "../types/post";

export function CommunityFeed({
  posts,
}: {
  posts: CommunityPost[];
}) {

  return (

    <div
      className="
      space-y-4
      "
    >

      {posts.map(
        (post) => (

          <div
            key={post.id}
            className="
            rounded-3xl
            border
            border-white/10
            p-6
            "
          >
            <p>
              {post.content}
            </p>

            <div
              className="
              mt-4
              text-sm
              text-zinc-400
              "
            >
              ❤️ {post.likes}
              •
              💬 {post.comments}
            </div>

          </div>
        )
      )}

    </div>
  );
}