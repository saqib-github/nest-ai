// linkedin-account.schema.ts

import * as mongoose from 'mongoose';
import { LinkedInAccountInterface } from 'src/interfaces/linkedin-account.interface';
import { User } from 'src/models/user.model';

export const LinkedInSchema = new mongoose.Schema<LinkedInAccountInterface>({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: User.name },
  access_token: { type: String },
  expires_in: { type: Number },
  scope: { type: String },
  token_type: { type: String },
  id_token: { type: String },
  sub: { type: String },
  email_verified: { type: Boolean },
  // other fields as needed
});

// {
//     access_token: 'AQXDutc4T_nd91Wtsx2ieiS-AFmbUWtRERfk0nQlLTajZENcUAPyTVX2ooj0W-MTNgG11Yqj4xGXe5SvozSKHkViMXnaKvDYk9VOLGkWdlClvr5r_vDfe_fpVqaHUWvetN_wDP6A1RvdFM2fkkBi75zQ1Xgv_kBtUx05-o5bBXHzHz8GmJ_uoglGVXvtvAjbCqKKhijbtYgpG4j6Vsw22yRK5VSsH-NdaGdFfXHEAkN00rhCuz9NAWDCPAN8AUDa0xJwD33iZwp1Em9eTlRI9dx9tfDPZBI1rJ9zYJys7jGDFF3JjJluHOpYkAPra2K8sMqQNKznO8jcu4Nq1ZjqusUtRRQsjg',
//     expires_in: 5183999,
//     scope: 'email,openid,profile,w_member_social',
//     token_type: 'Bearer',
//     id_token: 'eyJ6aXAiOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImQ5Mjk2NjhhLWJhYjEtNGM2OS05NTk4LTQzNzMxNDk3MjNmZiIsImFsZyI6IlJTMjU2In0.eyJpc3MiOiJodHRwczovL3d3dy5saW5rZWRpbi5jb20iLCJhdWQiOiI3NzA4OXkzYWJ5aTFiYSIsImlhdCI6MTcwNjY5Nzc2MSwiZXhwIjoxNzA2NzAxMzYxLCJzdWIiOiJibUNJRERqeTJLIiwibmFtZSI6IkFubW9sIFNhcWliIiwiZ2l2ZW5fbmFtZSI6IkFubW9sIiwiZmFtaWx5X25hbWUiOiJTYXFpYiIsInBpY3R1cmUiOiJodHRwczovL21lZGlhLmxpY2RuLmNvbS9kbXMvaW1hZ2UvRDREMDNBUUhjeURWZmxaWHpCZy9wcm9maWxlLWRpc3BsYXlwaG90by1zaHJpbmtfMTAwXzEwMC8wLzE3MDEzNTY2NDE3OTA_ZT0yMTQ3NDgzNjQ3JnY9YmV0YSZ0PXVOV0ctbVNCS185RVlBZnNKcmpHaV9LVExyRkNsOXBFUGwxWGVvZ3lLTDAiLCJlbWFpbCI6ImFubW9sc2FxaWIxNDNAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOiJ0cnVlIiwibG9jYWxlIjoiZW5fVVMifQ.AwIhkzzry8XzT7UHVklNhSihqzzzE7jNCDKiHb2LQA_WAnep3Yrrxll5FHHfWlhy9pryw9arktp6vSwQ-v_F7WaSGAhKmz-XCkgv8td6gNJ93nSwGmg61WNFIqK7LzlZ2rEEzUvRv9DpyTnWXLJFKG5coLFPoyrOecCx7ALKZ0U5Cf4JxD3Y1r8hZD-WDx2tfAiiXLpxt7MAhQZLEHIaUomD9AtC8hnqaWLdApNKZsbH4ovW0KoBf_eImq8AfMnXk5Vn67NkL18Wgg6ZVVdx79fibnU2y_JDbr8yLIGtaAW01gS9df-k1Z5Rj4V6z11XYRuJb7-VeD_2RFqWw0lWxdfEBx3WvZCdR5HtGY-wH6npoxGDx_-TmIzEUopLC2bR_-gkCFTP8UDaz9Wc5UH2SURZe_os2hkCyedtMKF803o5TsB5Ax46RB9Zvqr2Wuo7Tcr8B9My_70AQ1RUmI3LI5SDZ8YmtNppag2bQ1jXe6-JaK2pIPkxcdGg6P-NLCylhVSOzzQkk2POnROQPvVnGbd1yJ0sWnUs3QpmX5gNINwugsZ-lpTgKqOf0_ymqmBqPJ-k0LWDPQDdN6-ZPzrpd24d_zH2BR7P2f_rDyrJrR0i7coWPxDV8Ub90naTSmeuWsK9sk42SV7ODwttNKDuJRGQg8_lD1Q9Qh9Ov8m-jFU'
//   }
//   {
//     sub: 'bmCIDDjy2K',
//     email_verified: true,
//     name: 'Anmol Saqib',
//     locale: { country: 'US', language: 'en' },
//     given_name: 'Anmol',
//     family_name: 'Saqib',
//     email: 'anmolsaqib143@gmail.com',
//     picture: 'https://media.licdn.com/dms/image/D4D03AQHcyDVflZXzBg/profile-displayphoto-shrink_100_100/0/1701356641790?e=1712188800&v=beta&t=KLgwnZn8AufmGCqUQV6JzsTXPSFqYUHgQMquKmRr-X8'
//   }
