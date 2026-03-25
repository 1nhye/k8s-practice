'use client'

import { useState } from 'react'

export default function Home() {
  const [text, setText] = useState('')
  const [result, setResult] = useState<{ label: string; score: number } | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!text.trim()) return

    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const res = await fetch(`/api/predict?text=${encodeURIComponent(text)}`, {
        method: 'POST',
      })
      if (!res.ok) throw new Error(`서버 오류: ${res.status}`)
      const data = await res.json()
      setResult(data.result[0])
    } catch (err) {
      setError(err instanceof Error ? err.message : '알 수 없는 오류')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 bg-zinc-50">
      <div className="w-full max-w-md bg-white rounded-2xl shadow p-8 flex flex-col gap-6">
        <h1 className="text-2xl font-semibold text-zinc-800">감성 분석</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <textarea
            className="w-full border border-zinc-300 rounded-lg p-3 text-zinc-800 resize-none focus:outline-none focus:ring-2 focus:ring-zinc-400"
            rows={4}
            placeholder="분석할 영문 텍스트를 입력하세요..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button
            type="submit"
            disabled={loading || !text.trim()}
            className="bg-zinc-800 text-white rounded-lg py-2 font-medium hover:bg-zinc-700 disabled:opacity-40 transition-colors"
          >
            {loading ? '분석 중...' : '분석하기'}
          </button>
        </form>

        {error && (
          <p className="text-red-500 text-sm">{error}</p>
        )}

        {result && (
          <div className="border border-zinc-200 rounded-lg p-4 flex flex-col gap-1">
            <p className="text-sm text-zinc-500">결과</p>
            <p className="text-xl font-bold text-zinc-800">
              {result.label === 'POSITIVE' ? '긍정' : '부정'}
            </p>
            <p className="text-sm text-zinc-500">
              신뢰도: {(result.score * 100).toFixed(1)}%
            </p>
          </div>
        )}
      </div>
    </main>
  )
}
