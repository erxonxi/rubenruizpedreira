/* eslint-disable no-console */
import type { Request, Response } from 'express'
import express from 'express'
import axios from 'axios'

const app = express()

app.get('/api', (req: Request, res: Response) => {
  return res.status(201).json({ message: 'API running!' })
})

app.put('/api/newsletter/subscribe/:email', async (req: Request, res: Response) => {
  const options = {
    method: 'PUT',
    url: `https://api.mailerlite.com/api/v2/subscribers/${req.params.email}`,
    headers: {
      'Accept': 'application/json',
      'X-MailerLite-ApiDocs': 'true',
      'Content-Type': 'application/json',
      'X-MailerLite-ApiKey': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0IiwianRpIjoiNzM2MWM0M2UyOGYxMGQ1NTk4NDEzOWZkZGNmODVmNDZmNjA3MTJkM2FiOWE0MDk5MjRmYjU4NmVmNDcwMTEyMzRkYWVlMWMxNTUyNmY0NjIiLCJpYXQiOjE2NTUwMzI0NDUuMTU3OTk4LCJuYmYiOjE2NTUwMzI0NDUuMTU4MDAxLCJleHAiOjQ4MTA3MDYwNDUuMTUzMzQxLCJzdWIiOiI5NTM5NyIsInNjb3BlcyI6W119.FcGdRtv6rNm4cE8vlesZDdPrBlUNunVbzLKockTgK0buqemcSA7x7LV5g00dxkDaJZStvxjdlh4SEX4TzUljDDjPC2FOjPCUIroABkGi4irZZS7Jp14UU0S1rSW-5f7WFizhsuxH-T3YcSPXSiFUYp96AovOvedyIEO_tLC1_1rj1Hkyrht6ELmv81l7emkJc-sy9t_pjg2JKmg3AQTj66xZ4j_U0Ty331yKr3ib3_DpDJvV8f3h_NoqQhjPKlYqQ584owzrm9SggmirjVbp4Q4d_WDtNcFECtxHkKzQPBgk6GHzaj8pCTuwNq9lop-onZauaVPHyejT_ACKhBx3KQSmlLR2aPKNa3C59MyniKz5QcbH31NoNMK9DbYupNm1QtCHIDlqhybRY6V4Dt0HV9CIHjTl1o4BuCihFC_-a0NPiKPlLYM3ibHRPonzzWerlYvfEbYfvy6LpRHyQ1nLE3P7kqiToVLEth9BNp7ekJnhYzpbjROlqtv2s06j_EVxS6FNdN7MOEK2xp8OFwQoXiVGq5wWI85krCwRc8GU87WtAsLuR2L3H8Uk8TajGE0OxdIwUFCk0xQ_yjSMsYOja6rnTkKOo5YvgVMzrCJ_G1msKSxjSohk8A7p_uUkcX4rz2uQgyARVdwHydQTMcBNwxKZQ3R8YU_Yv_8ZKhG0kdY',
    },
    data: { type: 'null', resend_autoresponders: false },
  }

  axios(options)
    .then(res => console.log(res.data))
    .catch(err => console.log(err))
  // if (response.status !== 200)
  //   return res.status(400).json({ message: 'Error during subscribe...' })

  return res.status(201).json({ message: 'Subscribed successfully' })
})

export const handler = app
