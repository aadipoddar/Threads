import PostListItem from "@/components/PostListItem";
import { supabase } from "@/lib/supabase";
import { Post } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { Link } from "expo-router";
import { ActivityIndicator, FlatList, Text, View } from "react-native";

const fetchPosts = async () => {
  const { data } = await supabase
    .from("posts")
    .select("*, user:profiles(*)")
    .throwOnError();

  return data;
};

export default function HomeScreen() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  })

  if (isLoading)
    return <ActivityIndicator />

  if (error)
    return <Text className="text-red-500">{error.message}</Text>

  return (
    <FlatList
      data={data}
      renderItem={({ item }) => <PostListItem post={item} />}
      ListHeaderComponent={() => (
        <>
          <Link href="/new" className="text-blue-500 p-4 text-center text-3xl">
            New Post
          </Link>
        </>
      )}
    />
  );
}
