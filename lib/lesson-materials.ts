export type LessonSection = {
  title: string;
  body: string;
  examples: string[];
};

export type LessonCheck = {
  prompt: string;
  options: string[];
  answer: number;
  explanation: string;
};

export type LessonMaterial = {
  introduction: string;
  sections: LessonSection[];
  check: LessonCheck;
};

export const LESSON_MATERIALS: Record<string, LessonMaterial> = {
  "ipa-vowels": {
    introduction: "Nguyên âm được tạo ra khi luồng hơi đi qua miệng mà không bị chặn. Độ dài và vị trí lưỡi làm thay đổi nghĩa của từ.",
    sections: [
      { title: "Nguyên âm dài và ngắn", body: "Dấu /ː/ cho biết âm dài. Đừng chỉ kéo dài âm ngắn thành âm dài; khẩu hình cũng có thể khác.", examples: ["/iː/ sheep - /ɪ/ ship", "/uː/ fool - /ʊ/ full", "/ɑː/ cart - /æ/ cat"] },
      { title: "Các cặp cần luyện", body: "Đọc mỗi cặp chậm, giữ đúng khẩu hình rồi tăng tốc độ. Tiếng Việt không có một số đối lập này.", examples: ["/e/ bed - /æ/ bad", "/ʌ/ cup - /ɑː/ calm", "/ɒ/ cot (BrE) - /ɔː/ caught (BrE)"] },
      { title: "Chú ý biến thể giọng", body: "Bảng IPA có thể khác giữa từ điển Anh-Anh và Anh-Mỹ. Ví dụ cot/caught thường nhập âm trong nhiều giọng Mỹ.", examples: ["hot /hɒt/ (BrE), /hɑːt/ (AmE)", "bird /bɜːd/ (BrE), /bɝːd/ (AmE)"] },
    ],
    check: { prompt: "Ký hiệu /ː/ trong phiên âm cho biết điều gì?", options: ["Âm được nhấn", "Nguyên âm dài", "Âm câm"], answer: 1, explanation: "Dấu hai chấm /ː/ đánh dấu độ dài của nguyên âm." },
  },
  "ipa-consonants": {
    introduction: "Phụ âm được phân biệt theo vị trí cấu âm, cách luồng hơi bị cản và độ rung của dây thanh.",
    sections: [
      { title: "Âm bật hơi", body: "Các âm /p b/, /t d/, /k ɡ/ dùng vị trí môi, lợi và ngạc mềm tương ứng. Hãy đặt tay lên cổ để cảm nhận độ rung.", examples: ["/p/ pen - /b/ bed", "/t/ ten - /d/ den", "/k/ coat - /ɡ/ goat"] },
      { title: "Âm dễ nhầm", body: "/θ/ và /ð/ được tạo bằng cách đặt đầu lưỡi nhẹ giữa hai hàm răng; /ʃ/ và /tʃ/ không giống âm /s/.", examples: ["/θ/ thin - /ð/ this", "/s/ sip - /ʃ/ ship", "/ʃ/ shoe - /tʃ/ chew"] },
      { title: "Phụ âm cuối", body: "Giữ phụ âm cuối rõ ràng, không thêm nguyên âm sau nó. Âm cuối giúp phân biệt nhiều từ và dạng số nhiều.", examples: ["cap /kæp/ - cab /kæb/", "rice /raɪs/ - rise /raɪz/", "back /bæk/ - bag /bæɡ/"] },
    ],
    check: { prompt: "Âm đầu của từ thin được phiên âm thế nào?", options: ["/ð/", "/θ/", "/s/"], answer: 1, explanation: "Thin bắt đầu bằng /θ/ vô thanh; this bắt đầu bằng /ð/ hữu thanh." },
  },
  "ipa-diphthongs": {
    introduction: "Nguyên âm đôi là một âm tiết có khẩu hình chuyển động từ vị trí nguyên âm này sang vị trí khác.",
    sections: [
      { title: "Năm âm đôi phổ biến", body: "Bắt đầu ở âm thứ nhất rồi lướt liền mạch sang âm thứ hai, không tách thành hai âm tiết.", examples: ["/eɪ/ day", "/aɪ/ my", "/ɔɪ/ boy", "/aʊ/ now", "/əʊ/ (BrE) go; /oʊ/ (AmE) go"] },
      { title: "Các âm đôi còn lại", body: "Ba âm /ɪə, eə, ʊə/ thường được dạy trong mô tả Anh-Anh. Nhiều giọng Anh-Mỹ phát âm chúng thành nguyên âm cộng /r/.", examples: ["/ɪə/ near (BrE)", "/eə/ square (BrE)", "/ʊə/ cure (BrE)"] },
      { title: "Luyện chuyển âm", body: "Kéo dài âm một chút và làm rõ điểm kết thúc. Có thể nghe mẫu từ bằng giọng thiết bị để so sánh.", examples: ["late - light", "loud - load", "toy - tie"] },
    ],
    check: { prompt: "Từ boy có nguyên âm đôi nào?", options: ["/aɪ/", "/ɔɪ/", "/aʊ/"], answer: 1, explanation: "Boy được phiên âm /bɔɪ/ với nguyên âm đôi /ɔɪ/." },
  },
  "voiced-unvoiced": {
    introduction: "Âm hữu thanh làm rung dây thanh; âm vô thanh không làm rung. Nhiều cặp phụ âm chỉ khác nhau ở đặc điểm này.",
    sections: [
      { title: "Cảm nhận độ rung", body: "Đặt nhẹ ngón tay lên cổ họng, đọc hai âm liên tiếp. Giữ cùng vị trí lưỡi và môi để chỉ so sánh độ rung.", examples: ["/p/ - /b/", "/t/ - /d/", "/k/ - /ɡ/"] },
      { title: "Các cặp khác", body: "Luyện từ trong cặp tối thiểu để nghe sự khác biệt trong ngữ cảnh.", examples: ["/f/ - /v/: fan - van", "/s/ - /z/: sip - zip", "/θ/ - /ð/: thigh - thy", "/ʃ/ - /ʒ/: pressure - pleasure"] },
      { title: "Âm cuối và đuôi từ", body: "Độ hữu thanh ảnh hưởng đến cách đọc đuôi -s/-es và -ed. Hãy xác định âm cuối là hữu thanh hay vô thanh trước khi thêm đuôi.", examples: ["cats /s/ - dogs /z/", "washed /t/ - played /d/", "wanted /ɪd/"] },
    ],
    check: { prompt: "Âm nào hữu thanh trong cặp /f/ và /v/?", options: ["/f/", "/v/", "Cả hai"], answer: 1, explanation: "/v/ hữu thanh; /f/ vô thanh." },
  },
  "ipa-word-stress": {
    introduction: "Phiên âm từ điển cho biết âm và trọng âm. Đọc đúng trọng âm giúp lời nói dễ hiểu hơn ngay cả khi chưa nói nhanh.",
    sections: [
      { title: "Dấu trọng âm", body: "Dấu /ˈ/ đứng trước âm tiết mang trọng âm chính; /ˌ/ đứng trước trọng âm phụ.", examples: ["about /əˈbaʊt/", "photograph /ˈfəʊtəɡrɑːf/", "photographic /ˌfəʊtəˈɡræfɪk/"] },
      { title: "Âm schwa /ə/", body: "Schwa là nguyên âm yếu, ngắn và thường xuất hiện trong âm tiết không nhấn. Đừng đọc mọi nguyên âm viết ra với lực như nhau.", examples: ["about /əˈbaʊt/", "teacher /ˈtiːtʃə/ (BrE)", "support /səˈpɔːt/ (BrE)"] },
      { title: "Từ đổi trọng âm", body: "Một số cặp danh từ/động từ đổi vị trí trọng âm. Hãy học trọng âm cùng với từ loại và câu ví dụ.", examples: ["REcord (noun) - reCORD (verb)", "PREsent (noun) - preSENT (verb)"] },
    ],
    check: { prompt: "Dấu /ˈ/ trong /əˈbaʊt/ đứng trước điều gì?", options: ["Âm tiết được nhấn chính", "Âm cuối", "Âm câm"], answer: 0, explanation: "Dấu /ˈ/ đặt ngay trước âm tiết mang trọng âm chính: /baʊt/." },
  },
  "ipa-practice": {
    introduction: "Kết hợp nhận diện ký hiệu, nghe mẫu và tự đọc. Ưu tiên độ chính xác của âm và trọng âm trước khi tăng tốc.",
    sections: [
      { title: "Đọc theo cặp", body: "Nghe từng từ, đọc lại và tự kiểm tra âm mục tiêu. Có thể dùng chức năng nghe của thiết bị; phát âm giọng máy chỉ là mẫu tham khảo.", examples: ["ship /ʃɪp/ - sheep /ʃiːp/", "fan /fæn/ - van /væn/", "think /θɪŋk/ - sink /sɪŋk/"] },
      { title: "Đọc từ có trọng âm", body: "Tìm dấu /ˈ/, chia nhịp từ rồi đọc âm tiết nhấn rõ hơn. Âm tiết yếu thường ngắn và nhẹ.", examples: ["banana /bəˈnɑːnə/", "important /ɪmˈpɔːtənt/ (BrE)", "computer /kəmˈpjuːtə/ (BrE)"] },
      { title: "Quy trình tự sửa", body: "Nghe mẫu một lần, đọc chậm một lần, ghi âm nếu có thể rồi so sánh âm đầu, nguyên âm, âm cuối và trọng âm.", examples: ["three /θriː/", "very /ˈveri/", "asked /ɑːskt/ (BrE)"] },
    ],
    check: { prompt: "Cặp nào phân biệt /ɪ/ ngắn và /iː/ dài?", options: ["ship - sheep", "fan - van", "sip - zip"], answer: 0, explanation: "Ship /ʃɪp/ và sheep /ʃiːp/ khác nhau ở nguyên âm /ɪ/ và /iː/." },
  },
  "verb-forms": {
    introduction: "Động từ bất quy tắc không tạo quá khứ đơn và quá khứ phân từ chỉ bằng cách thêm -ed. Học ba cột cùng nhau để chọn đúng dạng.",
    sections: [
      { title: "V1: nguyên thể", body: "Dùng nguyên thể sau to, modal verbs và trong hiện tại đơn với chủ ngữ I/you/we/they.", examples: ["to write", "can go", "They make lunch."] },
      { title: "V2: quá khứ đơn", body: "Dùng V2 cho hành động đã kết thúc tại thời điểm quá khứ xác định.", examples: ["write - wrote: I wrote a note yesterday.", "go - went: We went home."] },
      { title: "V3: quá khứ phân từ", body: "Dùng V3 sau have/has/had hoặc trong câu bị động với be.", examples: ["write - written: She has written a note.", "make - made: The cake was made today."] },
    ],
    check: { prompt: "Chọn đúng: She has ___ the letter.", options: ["wrote", "written", "write"], answer: 1, explanation: "Sau has dùng quá khứ phân từ V3: written." },
  },
  "same-forms": {
    introduction: "Một nhóm động từ giữ nguyên cả ba dạng. Dù hình thức không đổi, thời gian và vai trò ngữ pháp trong câu vẫn quyết định cách hiểu.",
    sections: [
      { title: "Nhóm tiêu biểu", body: "Dạng V1, V2 và V3 giống nhau. Học ví dụ câu để không nhầm đây là động từ thường.", examples: ["cut - cut - cut", "put - put - put", "hit - hit - hit", "let - let - let"] },
      { title: "Dùng ở quá khứ", body: "Từ chỉ thời gian hoặc ngữ cảnh cho biết đây là V2.", examples: ["I cut the paper yesterday.", "She put the keys on the table."] },
      { title: "Dùng với trợ động từ", body: "Sau have/has/had, các động từ này vẫn giữ nguyên hình thức nhưng đang làm V3.", examples: ["I have cut the paper.", "They have put the books away."] },
    ],
    check: { prompt: "Chọn V2 của put.", options: ["put", "putted", "puts"], answer: 0, explanation: "Put có ba dạng put - put - put." },
  },
  "past-same-participle": {
    introduction: "Nhiều động từ đổi ở V2 rồi giữ cùng một dạng cho V3. Nhận ra mẫu này giúp ghi nhớ theo nhóm.",
    sections: [
      { title: "Đuôi -t hoặc -d", body: "Một số động từ đổi nguyên âm và kết thúc bằng -t hoặc -d ở cả V2 và V3.", examples: ["feel - felt - felt", "keep - kept - kept", "send - sent - sent", "build - built - built"] },
      { title: "Đuôi -ought/-aught", body: "Một nhóm phổ biến có cách viết đặc trưng; học cùng nhau nhưng chú ý phát âm từng từ.", examples: ["buy - bought - bought", "bring - brought - brought", "teach - taught - taught", "think - thought - thought"] },
      { title: "Dùng trong câu", body: "V2 đi với mốc quá khứ; V3 đi sau have/has/had hoặc be.", examples: ["He bought it last week.", "He has bought it."] },
    ],
    check: { prompt: "Chọn V3 của teach.", options: ["teached", "taught", "teaching"], answer: 1, explanation: "Teach - taught - taught; V2 và V3 đều là taught." },
  },
  "vowel-changes": {
    introduction: "Một mẫu thường gặp là nguyên âm đổi qua từng cột. Đọc thành nhịp ba dạng để nhớ cả chính tả và âm.",
    sections: [
      { title: "Mẫu i-a-u", body: "Một số động từ theo nhịp nguyên âm i ở V1, a ở V2 và u ở V3.", examples: ["sing - sang - sung", "drink - drank - drunk", "begin - began - begun", "swim - swam - swum"] },
      { title: "Các biến đổi khác", body: "Không phải mọi động từ đều theo một mẫu duy nhất. Hãy học cả chuỗi thay vì đoán từ quy tắc.", examples: ["speak - spoke - spoken", "write - wrote - written", "drive - drove - driven"] },
      { title: "Luyện theo nhịp", body: "Đọc đều ba nhịp, sau đó che từng cột và tự nhớ lại dạng còn thiếu.", examples: ["ring - rang - rung", "rise - rose - risen", "freeze - froze - frozen"] },
    ],
    check: { prompt: "Chọn bộ ba đúng của sing.", options: ["sing - sung - sang", "sing - sang - sung", "sing - singed - sung"], answer: 1, explanation: "Sing - sang - sung là chuỗi đúng." },
  },
  "other-patterns": {
    introduction: "Một số động từ có biến đổi riêng, có dạng thay thế theo vùng miền hoặc không theo mẫu phổ biến. Tra đúng từ điển khi cần dùng trong văn bản trang trọng.",
    sections: [
      { title: "Dạng quá khứ đặc biệt", body: "Một số động từ có V2 không giống V1 nhưng V3 quay về dạng V1.", examples: ["come - came - come", "run - ran - run", "become - became - become"] },
      { title: "Dạng thay thế", body: "Một số dạng có thể khác theo Anh-Anh/Anh-Mỹ hoặc theo lựa chọn regular/irregular. Cột tra cứu dùng dấu gạch chéo cho biến thể.", examples: ["learn - learnt/learned - learnt/learned", "dream - dreamt/dreamed - dreamt/dreamed", "get - got - got (BrE); gotten (AmE)"] },
      { title: "Không đoán từ bề ngoài", body: "Một từ trông như động từ bất quy tắc có thể có dạng thường, và ngược lại. Hãy xác nhận bằng bảng tra thay vì tự áp mẫu.", examples: ["show - showed - shown", "prove - proved - proved/proven", "lie (nằm) - lay - lain"] },
    ],
    check: { prompt: "V3 của come là gì?", options: ["came", "come", "comed"], answer: 1, explanation: "Come - came - come; V3 quay về dạng nguyên thể." },
  },
  "verb-usage": {
    introduction: "Chọn dạng động từ theo cấu trúc câu: V2 cho quá khứ đơn, V3 sau trợ động từ hoàn thành hoặc be trong câu bị động.",
    sections: [
      { title: "Quá khứ đơn: V2", body: "Dùng với mốc quá khứ đã kết thúc như yesterday, last week hoặc in 2020.", examples: ["I saw her yesterday.", "They took the train last night."] },
      { title: "Thì hoàn thành: have + V3", body: "Sau have/has/had dùng V3, không dùng V2.", examples: ["She has seen the film.", "We had taken the wrong road."] },
      { title: "Câu bị động: be + V3", body: "Sau be ở câu bị động dùng V3; chủ ngữ là đối tượng nhận hành động.", examples: ["The window was broken.", "The emails were sent this morning."] },
    ],
    check: { prompt: "Chọn đúng: The emails were ___ this morning.", options: ["sent", "send", "sended"], answer: 0, explanation: "Câu bị động dùng be + V3; send - sent - sent." },
  },
  "verbs-review": {
    introduction: "Ôn tập bằng cách gọi lại dạng từ trí nhớ, rồi đặt mỗi dạng vào đúng cấu trúc câu.",
    sections: [
      { title: "Nhớ theo ba cột", body: "Đọc V1, V2, V3 thành một nhịp. Tự che cột V2 hoặc V3 và viết lại trước khi xem đáp án.", examples: ["go - went - gone", "see - saw - seen", "take - took - taken"] },
      { title: "Phân biệt cấu trúc", body: "Nhận diện từ đứng trước chỗ trống: mốc quá khứ thường cần V2; have/has/had và be bị động cần V3.", examples: ["We ___ home yesterday. (went)", "We have ___ home. (gone)", "The keys were ___. (found)"] },
      { title: "Tra cứu biến thể", body: "Khi thấy hai dạng có dấu /, kiểm tra ngữ cảnh và biến thể Anh-Anh/Anh-Mỹ trước khi chọn.", examples: ["learned / learnt", "dreamed / dreamt", "got / gotten"] },
    ],
    check: { prompt: "Chọn đúng: They have ___ the keys.", options: ["found", "find", "founded"], answer: 0, explanation: "Sau have dùng V3. Find - found - found." },
  },
};
