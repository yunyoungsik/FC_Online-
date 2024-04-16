import { connectToDB } from '@/utils/database';
import User from '@/models/user';

export const POST = async (request, { params }) => {
  try {
    await connectToDB();

    const findUser = await User.findById(params.id);

    if (!findUser) {
      return new Response('Profile ID Find User POST Server Error', { status: 404 });
    }

    const findName = findUser.username;

    return new Response(JSON.stringify({ name: findName }), { status: 200 });
  } catch (error) {
    return new Response('Profile ID POST Server Error', { status: 500 });
  }
}

// 회원탈퇴
export const DELETE = async (request, { params }) => {
  try {
    await connectToDB();

    await User.findByIdAndDelete(params.id);

    return new Response('Profile ID DELETE Success', { status: 200 });
  } catch (error) {
    return new Response('Profile ID DELETE Server Error', { status: 500 });
  }
};


// 닉네임 변경
export const PATCH = async (request, { params }) => {
  const { name } = await request.json();

  try {
    await connectToDB();

    const existingUser = await User.findById(params.id);

    if (!existingUser) {
      return new Response('Profile ID Find User PATCH Server Error', { status: 404 });
    }

    existingUser.username = name;

    await existingUser.save();

    return new Response('Profile ID PATCH Success', { status: 200 });
  } catch (error) {
    return new Response('Profile ID DELETE Server Error', { status: 500 });
  }
};