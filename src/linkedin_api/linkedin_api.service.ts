import { Injectable } from '@nestjs/common';
import { CreateLinkedinApiDto } from './dto/create-linkedin_api.dto';
import { UpdateLinkedinApiDto } from './dto/update-linkedin_api.dto';

@Injectable()
export class LinkedinApiService {
  create(createLinkedinApiDto: CreateLinkedinApiDto) {
    return 'This action adds a new linkedinApi';
  }

  findAll() {
    return `This action returns all linkedinApi`;
  }

  findOne(id: number) {
    return `This action returns a #${id} linkedinApi`;
  }

  update(id: number, updateLinkedinApiDto: UpdateLinkedinApiDto) {
    return `This action updates a #${id} linkedinApi`;
  }

  remove(id: number) {
    return `This action removes a #${id} linkedinApi`;
  }


  createLinkedInPost(accessToken: string, text: string) {
    const url = 'https://api.linkedin.com/v2/ugcPosts';
    const headers = new Headers({
        'Authorization': 'Bearer ' + accessToken,
        'Content-Type': 'application/json',
        'X-Restli-Protocol-Version': '2.0.0'
    });
    const body = JSON.stringify({
        'author': 'urn:li:person:YOUR_USER_ID', // Replace with your LinkedIn User ID
        'lifecycleState': 'PUBLISHED',
        'specificContent': {
            'com.linkedin.ugc.ShareContent': {
                'shareCommentary': {
                    'text': text
                },
                'shareMediaCategory': 'NONE'
            }
        },
        'visibility': {
            'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC'
        }
    });

    fetch(url, {
        method: 'POST',
        headers: headers,
        body: body
    })
    .then(response => {
        if (response.status === 201) {
            console.log("Post created successfully!");
        } else {
            console.error("Failed to create post:", response.statusText);
        }
    })
    .catch(error => console.error("Error:", error));
}
}
