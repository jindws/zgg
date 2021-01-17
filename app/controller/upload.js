const fs = require("fs");
const path = require("path");
const Controller = require("egg").Controller;
const awaitWriteStream = require("await-stream-ready").write;
const sendToWormhole = require("stream-wormhole");
const download = require("image-downloader");
/**
 * @Controller 上传
 */
class UploadController extends Controller {
  constructor(ctx) {
    super(ctx);
  }

  /**
   * @summary 上传单个文件
   * @description 上传单个文件
   * @router post /api/upload/single
   */
  async create() {
    const { ctx } = this;
    // 要通过 ctx.getFileStream 便便捷的获取到⽤用户上传的⽂文件，需要满⾜足两个条件: // 只⽀支持上传⼀一个⽂文件。

    // 上传⽂文件必须在所有其他的 fields 后⾯面，否则在拿到⽂文件流时可能还获取不不到 fields。
    const stream = await ctx.getFileStream();
    // 所有表单字段都能通过 `stream.fields` 获取到
    const filename = path.basename(stream.filename); // ⽂文件名称
    const extname = path.extname(stream.filename).toLowerCase(); // ⽂文件扩展
    const uuid = (Math.random() * 999999).toFixed();
    // 组装参数 stream
    const target = path.join(
      this.config.baseDir,
      "app/public/uploads",
      `${uuid}${extname}`
    );
    const writeStream = fs.createWriteStream(target); // ⽂文件处理理，上传到云存储等等
    try {
      await awaitWriteStream(stream.pipe(writeStream));
    } catch (err) {
      // 必须将上传的⽂文件流消费掉，要不不然浏览器器响应会卡死
      await sendToWormhole(stream);
      throw err;
    }
    // 调⽤用 Service 进⾏行行业务处理理
    // 设置响应内容和响应状态码
    ctx.helper.success({ ctx });
  }
}
module.exports = UploadController;
