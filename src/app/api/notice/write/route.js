import { connectToDB } from '@/utils/database';
import Notice from '@/models/notice';
import Counter from '@/models/counter';

export const POST = async (req) => {
  const { userId, title, desc } = await req.json();

  try {
    await connectToDB();

    const counter = await Counter.findOneAndUpdate(
      { name: 'counter' },
      { $inc: { noticeCounter: 1 } },
      { new: true }
    );

    const newNotice = new Notice({
      creator: userId,
      title,
      desc,
      noticeNum: counter.noticeCounter,
    });

    await newNotice.save();

    return new Response(JSON.stringify(newNotice), { status: 200 });
  } catch (error) {
    return new Response('Notice Write Server Error', { status: 500 });
  }
};
