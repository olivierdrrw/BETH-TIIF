"use client";

import { useEffect, useState } from "react";
import { CreatePostForm } from "@/features/community/create-post-form";
import { GroupCard } from "@/features/community/components/group-card";
import { ChallengeCard } from "@/features/community/components/challenge-card";
import { MentorCircleCard } from "@/features/community/components/mentor-circle-card";
import { EventCard } from "@/features/community/components/event-card";
import {
  getPosts,
  getGroups,
  getChallenges,
  getMentorCircles,
  getEvents,
  likePost,
} from "@/features/community/repositories/community-repository";
import type { CommunityPost } from "@/features/community/types/post";
import type { CommunityGroup } from "@/features/community/types/group";
import type { Challenge } from "@/features/community/types/challenge";
import type { MentorCircle } from "@/features/community/mentor-circles";
import type { CommunityEvent } from "@/features/community/types/event";
import { Heart, MessageCircle, Loader2 } from "lucide-react";
import { PostComments } from "@/features/community/components/post-comments";

export default function CommunityPage() {
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [groups, setGroups] = useState<CommunityGroup[]>([]);
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [mentorCircles, setMentorCircles] = useState<MentorCircle[]>([]);
  const [events, setEvents] = useState<CommunityEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedPost, setExpandedPost] = useState<string | null>(null);

  async function loadAll() {
    setIsLoading(true);
    const [postsData, groupsData, challengesData, mentorCirclesData, eventsData] = await Promise.all([
      getPosts(),
      getGroups(),
      getChallenges(),
      getMentorCircles(),
      getEvents(),
    ]);
    setPosts(postsData);
    setGroups(groupsData);
    setChallenges(challengesData);
    setMentorCircles(mentorCirclesData);
    setEvents(eventsData);
    setIsLoading(false);
  }

  useEffect(() => {
    loadAll();
  }, []);

  async function handleLike(postId: string) {
    setPosts((prev) =>
      prev.map((p) => (p.id === postId ? { ...p, likes: p.likes + 1 } : p))
    );
    await likePost(postId);
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Community</h1>
        <p className="mt-1 text-slate-400">
          Connect with people on the same growth journey.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          <CreatePostForm onPosted={loadAll} />

          {isLoading ? (
            <div className="flex justify-center py-12 text-slate-500">
              <Loader2 className="animate-spin" />
            </div>
          ) : posts.length === 0 ? (
            <p className="rounded-2xl border border-white/5 bg-white/[0.02] p-8 text-center text-sm text-slate-500">
              No posts yet — be the first to share something.
            </p>
          ) : (
            posts.map((post) => (
              <div
                key={post.id}
                className="rounded-2xl border border-white/10 bg-white/[0.02] p-6"
              >
                <p className="text-sm leading-6 text-slate-200">{post.content}</p>

                <div className="mt-4 flex items-center gap-4 text-sm text-slate-500">
                  <button
                    onClick={() => handleLike(post.id)}
                    className="flex items-center gap-1.5 transition hover:text-rose-300"
                  >
                    <Heart size={14} /> {post.likes}
                  </button>
                  <button
                    onClick={() =>
                      setExpandedPost(expandedPost === post.id ? null : post.id)
                    }
                    className="flex items-center gap-1.5 transition hover:text-navy-300"
                  >
                    <MessageCircle size={14} /> {post.comments}
                  </button>
                </div>

                {expandedPost === post.id && <PostComments postId={post.id} />}
              </div>
            ))
          )}
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="mb-3 text-sm font-medium uppercase tracking-wide text-slate-400">
              Groups
            </h3>
            <div className="space-y-3">
              {groups.length === 0 ? (
                <p className="text-sm text-slate-500">No groups yet.</p>
              ) : (
                groups.map((group) => <GroupCard key={group.id} group={group} />)
              )}
            </div>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-medium uppercase tracking-wide text-slate-400">
              Challenges
            </h3>
            <div className="space-y-3">
              {challenges.length === 0 ? (
                <p className="text-sm text-slate-500">No active challenges.</p>
              ) : (
                challenges.map((challenge) => (
                  <ChallengeCard key={challenge.id} challenge={challenge} />
                ))
              )}
            </div>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-medium uppercase tracking-wide text-slate-400">
              Mentor Circles
            </h3>
            <div className="space-y-3">
              {mentorCircles.length === 0 ? (
                <p className="text-sm text-slate-500">No mentor circles yet.</p>
              ) : (
                mentorCircles.map((circle) => (
                  <MentorCircleCard key={circle.id} circle={circle} />
                ))
              )}
            </div>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-medium uppercase tracking-wide text-slate-400">
              Events
            </h3>
            <div className="space-y-3">
              {events.length === 0 ? (
                <p className="text-sm text-slate-500">No upcoming events.</p>
              ) : (
                events.map((event) => <EventCard key={event.id} event={event} />)
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
