document.addEventListener('DOMContentLoaded', function () {
    const jobListElement = document.getElementById('job-list');
    const applicationListElement = document.getElementById('application-list');
    const applyForm = document.getElementById('apply-form');
    const responseMessage = document.getElementById('response-message');

    // アルバイト一覧を取得して表示
    fetch('https://*************************************************', {
            headers: {
                Accept: '*',
            },
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`${response.status} ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            data.forEach(job => {
                const li = document.createElement('li');
                li.textContent = `ID: ${job.jobId}, タイトル: ${job.title}, 詳細: ${job.description}`;
                jobListElement.appendChild(li);
            });
        })
        .catch(error => console.error('Error fetching jobs:', error));

    // 申し込み一覧を取得して表示
    fetch('https://*************************************************', {
            headers: {
                Accept: '*',
            },
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`${response.status} ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            data.forEach(application => {
                const li = document.createElement('li');
                li.textContent = `ID: ${application.jobId}, 申込者: ${application.name}`;
                applicationListElement.appendChild(li);
            });
        })
        .catch(error => console.error('Error fetching jobs:', error));


    // 応募フォームの送信処理
    applyForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const jobId = document.getElementById('job-id').value;

        const payload = {
            name: name,
            jobId: jobId
        };

        fetch('https://********************************', {  // replace with your actual API endpoint
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        })
            .then(response => response.json())
            .then(data => {
                if (data.message) {
                    responseMessage.textContent = '応募が完了しました！';
                    responseMessage.style.color = 'green';
                } else {
                    responseMessage.textContent = '応募に失敗しました。';
                    responseMessage.style.color = 'red';
                }
            })
            .catch(error => {
                responseMessage.textContent = '応募に失敗しました。';
                responseMessage.style.color = 'red';
                console.error('Error applying for job:', error);
            });
    });
});
