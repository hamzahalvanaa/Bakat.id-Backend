import { Request, Response } from 'express';
import AWS = require('aws-sdk');
AWS.config.update({region: 'eu-central-1'});
const S3_BUCKET = process.env.S3_BUCKET;

const UPLOAD_CTRL: any = {};

UPLOAD_CTRL.uploadS3 = async (req: Request, res: Response) => {

  const s3 = new AWS.S3({
    signatureVersion: 'v4'
  });

  const fileName = req.query['file-name'];
  const s3Params = {
    Bucket: S3_BUCKET,
    Key: fileName,
    ContentType: 'image/jpeg',
    ACL: 'public-read'
  };

  s3.getSignedUrl('putObject', s3Params, (err, data) => {
    if (err) {
      return res.json({
        ok: false,
        message: "Error Amazon S3 Upload",
        err
      });
    }
    const returnData = {
      signedRequest: data,
      url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
    };
    res.write(JSON.stringify(returnData));
    res.end();
  });
}

export default UPLOAD_CTRL;