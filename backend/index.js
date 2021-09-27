const express = require('express');
const {PrismaClient} = require('@prisma/client');
const {DateTime} = require('luxon');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));

const prisma = new PrismaClient();

function formatPullDate(lastPulledAt) {
  if (lastPulledAt !== 'null') {
    return DateTime.fromMillis(parseInt(lastPulledAt, 10)).toString();
  }
  return DateTime.fromMillis(1).toString();
}

function sanitizeData(data) {
  delete data._status;
  delete data._changed;
  data.created_at = DateTime.fromMillis(
    parseInt(data.created_at, 10),
  ).toString();
  data.updated_at = DateTime.fromMillis(
    parseInt(data.updated_at, 10),
  ).toString();
  return data;
}

app.get('/sync', async (req, res) => {
  const {lastPulledAt} = req.query;
  const date = formatPullDate(lastPulledAt);
  const postsCreated = await prisma.post.findMany({
    where: {
      created_at: {
        gt: new Date(date),
      },
    },
  });
  const postsUpdated = await prisma.post.findMany({
    where: {
      updated_at: {
        gt: new Date(date),
      },
    },
  });
  const commentsCreated = await prisma.comment.findMany({
    where: {
      created_at: {
        gt: new Date(date),
      },
    },
  });
  const commentsUpdated = await prisma.comment.findMany({
    where: {
      updated_at: {
        gt: new Date(date),
      },
    },
  });
  return res.json({
    changes: {
      posts: {
        created: postsCreated,
        updated: postsUpdated,
        deleted: [],
      },
      comments: {
        created: commentsCreated,
        updated: commentsUpdated,
        deleted: [],
      },
    },
    timestamp: Date.now(),
  });
});

app.post('/sync', async (req, res) => {
  const changes = req.body;
  if (changes?.posts?.created?.length) {
    await Promise.all(
      changes.posts.created.map(data => {
        return prisma.post.create({
          data: sanitizeData(data),
        });
      }),
    );
  }
  if (changes?.posts?.updated?.length) {
    await Promise.all(
      changes.posts.updated.map(data => {
        return prisma.post.update({
          data: sanitizeData(data),
          where: {
            id: data.id,
          },
        });
      }),
    );
  }
  if (changes?.comments?.created?.length) {
    await Promise.all(
      changes.comments.created.map(data => {
        return prisma.comment.create({
          data: sanitizeData(data),
        });
      }),
    );
  }
  if (changes?.comments?.updated?.length) {
    await Promise.all(
      changes.comments.created.map(data => {
        return prisma.comment.update({
          data: sanitizeData(data),
          where: {
            id: data.id,
          },
        });
      }),
    );
  }
  return res.send();
});

app.listen(3000, () => console.log('Api started'));
