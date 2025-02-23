FROM public.ecr.aws/lambda/nodejs:22
WORKDIR ${LAMBDA_TASK_ROOT}

RUN dnf install -y tar gzip git

COPY ./package.json ./
COPY ./package-lock.json ./

RUN npm install
RUN npm install -g aws-cdk

CMD ["bash"]