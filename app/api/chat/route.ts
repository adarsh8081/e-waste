import { NextResponse } from 'next/server';
import { spawn } from 'child_process';

interface PythonResponse {
  response: string;
}

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    // Create a promise that resolves with the Python script's output
    const pythonResponse = await new Promise<PythonResponse>((resolve, reject) => {
      const pythonProcess = spawn('python', ['ml_scripts/inference.py'], {
        stdio: ['pipe', 'pipe', 'pipe']
      });

      let output = '';
      let errorOutput = '';

      pythonProcess.stdout.on('data', (data) => {
        output += data.toString();
      });

      pythonProcess.stderr.on('data', (data) => {
        errorOutput += data.toString();
      });

      pythonProcess.stdin.write(JSON.stringify({ message }) + '\n');
      pythonProcess.stdin.end();

      pythonProcess.on('close', (code) => {
        if (code === 0) {
          try {
            const response = JSON.parse(output);
            resolve(response);
          } catch (error) {
            reject(new Error('Failed to parse Python script output'));
          }
        } else {
          reject(new Error(`Python script exited with code ${code}: ${errorOutput}`));
        }
      });
    });

    return NextResponse.json({ response: pythonResponse.response });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
} 